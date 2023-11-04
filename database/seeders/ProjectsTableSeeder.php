<?php

namespace Database\Seeders;

use App\Models\Project;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectFactory::new()
            ->count(5)
            ->create();
    }
}
