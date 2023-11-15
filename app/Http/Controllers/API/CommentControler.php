<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentControler extends Controller
{
    // Get all the comments of specific ticket
    public function show(Request $request, int $ticketId) {
        $comments = Comment::where("ticket_id", $ticketId)->get();
        return response()->json($comments);
    }

    // Delete a specific comment
    public function destroy(Request $request, int $id){
        Comment::destroy($id);
        return response()->json(null, 204);
    }

    // Update a specific comment
    public function update(Request $request, int $id) {
        $comment = Comment::find($id);

        // Only the author can update his comment
        if($request->input("author_id" ) != $request->user()->id) {
            abort(401);
        }

        $comment->update($request->all());
        return response()->json($comment);
    }
}
