<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    public function userProjects($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $projects = $user->projects()->with('users')->get();

        return response()->json($projects);
    }

    // Get all projects
    public function index(Request $request)
    {
        // Only users with permission to manage projects can get all projects
        if (!$request->user()->hasPermissionTo('manage_projects')) {
            abort(403);
        }

        $projects = Project::with('users')->get();
        return response()->json($projects);
    }

    // Show a specific project
    public function show(Request $request, $id)
    {

        $project = Project::find($id);

        // Only users that have permission to manage projects or user that are associated to the project can get the project
        if (!$request->user()->hasPermissionTo('manage_projects') && !$project->users->contains($request->user())) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        return response()->json($project);
    }

    public function store(Request $request)
    {

        // Only users with permission to manage projects can create a new project
        if (!$request->user()->hasPermissionTo('manage_projects')) {
            abort(403);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|between:5,25|unique:projects',
            'description' => 'required|string|max:100',
            'contributors' => 'required|array',
        ]);

        $project = Project::create($validatedData);

        $project->users()->attach($request->input('contributors'));

        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {

        // Only users with permission to manage projects can update a project
        if (!$request->user()->hasPermissionTo('manage_projects')) {
            abort(403);
        }

        $validatedData = $request->validate([
            // Allow the current project's name
            'name' => 'string|between:5,25|unique:projects,name,' . $id,
            'description' => 'string|max:100',
            'contributors' => 'array',
        ]);

        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->update($validatedData);

        // Sync contributors if provided
        if ($request->has('contributors')) {
            $project->users()->sync($request->input('contributors'));
        }

        return response()->json($project);
    }

    public function destroy(Request $request, $id)
    {

        // Only users with permission to manage projects can delete a project
        if (!$request->user()->hasPermissionTo('manage_projects')) {
            abort(403);
        }

        // Delete a project from the database
        Project::destroy($id);
        return response()->json(null, 204);
    }

    // Add new contributors to a specific project
    public function addTeamMembers(Request $request, $id)
    {

        // Only users with permission to manage projects can add members to a project
        if (!$request->user()->hasPermissionTo('manage_projects')) {
            abort(403);
        }

        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $validatedData = $request->validate([
            'contributors' => 'required|array',
        ]);

        // Attach new contributors to the project
        $project->users()->attach($validatedData['contributors']);

        return response()->json($project);
    }

    public function removeTeamMember(Request $request, $id)
    {

        // Only users with permission to manage projects can remove members to a project
        if (!$request->user()->hasPermissionTo('manage_projects')) {
            abort(403);
        }

        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->users()->detach($request->input('member_id'));

        return response()->json($project, 204);
    }

}
