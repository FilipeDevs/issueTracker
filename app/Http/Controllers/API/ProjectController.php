<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::with('users')->get();
        return response()->json($projects);
    }

    public function show($id)
    {
        // Show a specific project
        $project = Project::find($id);
        return response()->json($project);
    }

    public function store(Request $request)
    {
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

    public function destroy($id)
    {
        // Delete a project from the database
        Project::destroy($id);
        return response()->json(null, 204);
    }

    // Add new contributors to a specific project
    public function addTeamMembers(Request $request, $id)
    {
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
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->users()->detach($request->input('member_id'));

        return response()->json($project, 204);
    }

}
