<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    // Get all the tickets of a specific project
    public function getProjectTickets(Request $request, int $project_id)
    {
        $tickets = Ticket::where("project_id", $project_id)->get();
        return response()->json($tickets);
    }

    // Get a specific ticket
    public function show($id)
    {
        $ticket = Ticket::find($id);
        return response()->json($ticket);
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
            'assignee' => 'required',
        ]);

        // Assign the auth user as the author
        $validatedData['author_name'] = $request->user()->name;

        $ticket = Ticket::create($validatedData);

        // Assign an assignee
        $assignee = User::find($request->input('assignee'));
        $ticket->assignee()->associate($assignee);
        $ticket->assignee_name = $assignee->name;
        $ticket->save();

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
            'assignee' => 'required',
        ]);

        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $ticket->update($validatedData);

        // Assign an assignee
        $assignee = User::find($request->input('assignee'));
        $ticket->assignee()->associate($assignee);
        $ticket->assignee_name = $assignee->name;
        $ticket->save();

        return response()->json($ticket);
    }

    public function destroy($id)
    {
        Ticket::destroy($id);
        return response()->json(null, 204);
    }
}
