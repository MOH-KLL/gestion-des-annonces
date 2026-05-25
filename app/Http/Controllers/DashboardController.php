<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Annonce;
use App\Models\Inscription;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'citoyen') {
            // Inscriptions du citoyen avec relation annonce
            $inscriptions = $user->inscriptions()->with('annonce')->get();
            $score = $user->score_civique;

            // Annonces en attente (ou actives selon ta logique)
            $annonces = Annonce::whereIn('statut', ['en_attente'])->get();

            return Inertia::render('Dashboard/Citoyen', [
                'auth' => [
                    'user' => $user,
                ],
                'inscriptions' => $inscriptions,
                'score' => $score,
                'annonces' => $annonces,
            ]);
        } elseif ($user->role === 'annonceur') {
            // Annonces de l'annonceur avec inscriptions et citoyens liés
            $annonces = $user->annonces()
                ->with(['inscriptions.citoyen', 'annonceur'])
                ->get();

            return Inertia::render('Dashboard/Annonceur', [
                'auth' => [
                    'user' => $user,
                ],
                'annonces' => $annonces,
            ]);
        } elseif ($user->role === 'admin') {
            // Données complètes pour l'admin
            $users = User::all();
            $annonces = Annonce::with('annonceur')->get();
            $inscriptions = Inscription::with(['citoyen', 'annonce.annonceur'])->get();

            return Inertia::render('Dashboard/Admin', [
                'auth' => [
                    'user' => $user,
                ],
                'users' => $users,
                'annonces' => $annonces,
                'inscriptions' => $inscriptions,
            ]);
        }

        return redirect()->route('login')->withErrors('Rôle utilisateur non reconnu.');
    }
}