<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

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

        // For demo purposes create an admin and manager
        $admin = User::create([
            'name' => 'Quandale Dingle',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        $admin->assignRole('admin');

        $manager = User::create([
            'name' => 'Bart Dingle',
            'email' => 'manager@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        $manager->assignRole('manager');
    }
}
