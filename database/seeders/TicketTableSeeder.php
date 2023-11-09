<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class TicketTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        $users->each(function ($user) use ($users) {
            $projects = $user->projects;

            $projects->each(function ($project) use ($users, $user) {
                $projectUserIds = $project->users->pluck('id');

                // Create tickets for each project associated with the user
                $tickets = Ticket::factory(2)->create([
                    'author_id' => $user->id,
                    'author_name' => $user->name,
                    'project_id' => $project->id,
                ]);

                // Associate other users with the created tickets who are also associated with the same project
                $otherUsers = $users->except($user->id)->whereIn('id', $projectUserIds);
                $tickets->each(function ($ticket) use ($otherUsers) {
                    if ($otherUsers->count() > 0) {
                        $usersToAttach = $otherUsers->random(1);
                        $ticket->users()->attach($usersToAttach);
                    }
                });
            });
        });
    }
}
