<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => 'integer|nullable|min:1',
            // Page number should be a positive integer, default is 1
        ]);

        $page = $request->input('page', 1);
        $perPage = 3;

        // Calculate the offset based on the page number
        $offset = ($page - 1) * $perPage;

        $projects = Project::with('users')
            ->offset($offset)
            ->limit($perPage)
            ->get();

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
        // Update the project in the database
        $project = Project::find($id);
        $project->update($request->all());
        return response()->json($project);
    }

    public function destroy($id)
    {
        // Delete a project from the database
        Project::destroy($id);
        return response()->json(null, 204);
    }

}
