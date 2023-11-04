<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        // List all projects
        $projects = Project::all();
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
        // Store a new project in the database
        $project = Project::create($request->all());
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
