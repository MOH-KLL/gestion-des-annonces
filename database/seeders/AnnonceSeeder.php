<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Annonce;
use App\Models\User;

class AnnonceSeeder extends Seeder
{
    public function run(): void
    {

        $annonceurVerifie = User::where('role','annonceur')->where('is_verified',true)->first();

        if ($annonceurVerifie) {
            Annonce::create(['user_id'=>$annonceurVerifie->id,'titre'=>'Annonce 1','description'=>'Description annonce 1','quartier'=>'Quartier 1','date_action'=>now()->addDays(1),'min_participants'=>3,'max_participants'=>10,'statut'=>'en_attente']);
            Annonce::create(['user_id'=>$annonceurVerifie->id,'titre'=>'Annonce 2','description'=>'Description annonce 2','quartier'=>'Quartier 2','date_action'=>now()->addDays(2),'min_participants'=>3,'max_participants'=>10,'statut'=>'en_attente']);
            Annonce::create(['user_id'=>$annonceurVerifie->id,'titre'=>'Annonce 3','description'=>'Description annonce 3','quartier'=>'Quartier 3','date_action'=>now()->addDays(3),'min_participants'=>3,'max_participants'=>10,'statut'=>'en_attente']);
            Annonce::create(['user_id'=>$annonceurVerifie->id,'titre'=>'Annonce 4','description'=>'Description annonce 4','quartier'=>'Quartier 4','date_action'=>now()->addDays(4),'min_participants'=>3,'max_participants'=>10,'statut'=>'en_attente']);
        }
    }
}

