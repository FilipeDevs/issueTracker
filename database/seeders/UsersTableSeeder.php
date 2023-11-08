<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(5)
            ->create()
            ->each(function ($user) {
                $projects = Project::inRandomOrder()
                    ->limit(3)
                    ->get();
                $user->projects()->attach($projects);
            });
    }
}
