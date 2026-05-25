<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use App\Models\Inscription;
use App\Models\User;

class AdminController extends Controller
{
        public function supprimerCitoyen($id){
            $citoyen = User::where('role', 'citoyen')->findOrFail($id);
            $citoyen->delete();

            return redirect()->back();
                }

        public function confirmerAnnonceur($id){
            $annonceur = User::where('role', 'annonceur')->findOrFail($id);
            $annonceur->is_verified = true;
            $annonceur->save();

            return redirect()->back();
        }

        public function rejeterAnnonceur($id){
            $annonceur = User::where('role', 'annonceur')->findOrFail($id);
            $annonceur->is_verified = false;
            $annonceur->save();

            return redirect()->back();
        }
        public function supprimerAnnonceur($id){
            $annonceur = User::where('role', 'annonceur')->findOrFail($id);
            $annonceur->delete();

            return redirect()->back();
        }
        public function supprimerAnnonce($id){
            $annonce = Annonce::findOrFail($id);
            $annonce->delete();

            return redirect()->back();
        }
        public function supprimerInscription($id){
            $inscription = Inscription::findOrFail($id);
            $inscription->delete();

            return redirect()->back();
        }
}