<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserFactory::new()
            ->count(10)
            ->create()
            ->each(function ($user) {
                $projects = Project::inRandomOrder()
                    ->limit(3)
                    ->get();
                $user->projects()->attach($projects);
            });
    }
}
