<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    // Get all the tickets of a specific project
    public function show(Request $request, int $project_id)
    {
        $tickets = Ticket::where("project_id", $project_id)->get();
        return response()->json($tickets);
    }

    // Get all the tickets from a specific user
    public function index(Request $request)
    {
        $user = $request->user();
        $tickets = $user->tickets;
        return response()->json($tickets);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|between:5,20',
            'description' => 'required|string|max:100',
            'type' => ['required', Rule::in(['issue', 'feature', 'bug'])],
            'status' => ['required', Rule::in(['closed', 'new', 'in progress'])],
            'priority' => ['required', Rule::in(['low', 'medium', 'high', 'immediate'])],
            'time_estimate' => 'required|integer|min:1',
            'project_id' => 'required|exists:projects,id',
            'contributors' => 'required|array',
        ]);

        $validatedData['author_id'] = $request->user()->id;
        $validatedData['author_name'] = $request->user()->name;

        $ticket = Ticket::create($validatedData);

        $ticket->users()->attach($request->input('contributors'));

        return response()->json($ticket, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|between:5,20|unique:tickets',
            'description' => 'required|string|max:100',
            'type' => ['required', Rule::in(['issue', 'feature', 'bug'])],
            'status' => ['required', Rule::in(['closed', 'new', 'in progress'])],
            'priority' => ['required', Rule::in(['low', 'medium', 'high', 'immediate'])],
            'time_estimate' => 'required|int|min:1',
            'contributors' => 'required|array',
        ]);

        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $ticket->update($validatedData);

        // Sync contributors if provided
        if ($request->has('contributors')) {
            $ticket->users()->sync($request->input('contributors'));
        }

        return response()->json($ticket);
    }

    public function destroy($id)
    {
        Ticket::destroy($id);
        return response()->json(null, 204);
    }
}
