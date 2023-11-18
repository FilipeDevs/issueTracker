<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Ticket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve all tickets and users associated with a project
        $tickets = Ticket::all();

        foreach ($tickets as $ticket) {
            $projectUsers = $ticket->project->users; // Assuming a relationship between Project and User models

            // Create comments for each user associated with the project
            foreach ($projectUsers as $user) {
                Comment::factory(1)->create([
                    'ticket_id' => $ticket->id,
                    'author_id' => $user->id,
                    'author_name' => $user->name,
                ]);
            }
        }
    }
}
