<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {

        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_verified' => true,
        ]);


        User::create([
            'name' => 'Annonceur Non Vérifié',
            'email' => 'annonceur_false@example.com',
            'password' => Hash::make('password'),
            'role' => 'annonceur',
            'is_verified' => false,
        ]);

        User::create([
            'name' => 'Annonceur Vérifié',
            'email' => 'annonceur_true@example.com',
            'password' => Hash::make('password'),
            'role' => 'annonceur',
            'is_verified' => true,
        ]);

        User::create(['name'=>'Citoyen 1','email'=>'citoyen1@example.com','password'=>Hash::make('password'),'role'=>'citoyen','score_civique'=>0]);
        User::create(['name'=>'Citoyen 2','email'=>'citoyen2@example.com','password'=>Hash::make('password'),'role'=>'citoyen','score_civique'=>0]);
        User::create(['name'=>'Citoyen 3','email'=>'citoyen3@example.com','password'=>Hash::make('password'),'role'=>'citoyen','score_civique'=>0]);
        User::create(['name'=>'Citoyen 4','email'=>'citoyen4@example.com','password'=>Hash::make('password'),'role'=>'citoyen','score_civique'=>0]);
        User::create(['name'=>'Citoyen 5','email'=>'citoyen5@example.com','password'=>Hash::make('password'),'role'=>'citoyen','score_civique'=>0]);
    }
}
