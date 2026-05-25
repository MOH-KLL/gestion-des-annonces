<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inscription;
use App\Models\User;
use App\Models\Annonce;

class InscriptionSeeder extends Seeder
{
    public function run(): void
    {

        $citoyen1 = User::where('email','citoyen1@example.com')->first();
        $citoyen2 = User::where('email','citoyen2@example.com')->first();
        $citoyen3 = User::where('email','citoyen3@example.com')->first();
        $annonce1 = Annonce::where('titre','Annonce 1')->first();
        $annonce2 = Annonce::where('titre','Annonce 2')->first();

        if ($citoyen1 && $annonce1) {
            Inscription::create(['user_id'=>$citoyen1->id,'annonce_id'=>$annonce1->id,'status'=>'en_attente']);
        }

        if ($citoyen2 && $annonce2) {
            Inscription::create(['user_id'=>$citoyen2->id,'annonce_id'=>$annonce2->id,'status'=>'en_attente']);
        }

        if ($citoyen3 && $annonce1) {
            Inscription::create(['user_id'=>$citoyen3->id,'annonce_id'=>$annonce1->id,'status'=>'en_attente']);
        }
    }
}
