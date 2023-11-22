<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $managerRole = Role::create(['name' => 'manager']);
        $developerRole = Role::create(['name' => 'developer']);

        // Create permissions
        $manageUsersPermission = Permission::create(['name' => 'manage_users']);
        $manageProjectsPermission = Permission::create(['name' => 'manage_projects']);
        $manageMembersPermission = Permission::create(['name' => 'manage_members']);

        $adminRole->givePermissionTo($manageUsersPermission, $manageProjectsPermission, $manageMembersPermission);
        $managerRole->givePermissionTo($manageProjectsPermission, $manageMembersPermission);
    }
}
