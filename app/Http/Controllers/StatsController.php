<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Annonce;
use App\Models\Inscription;
use Inertia\Inertia;

class StatsController extends Controller
{
    public function index()
    {
        $totalUtilisateurs = User::count();
        $totalCitoyens = User::where('role', 'citoyen')->count();
        $totalAnnonceurs = User::where('role', 'annonceur')->count();
        $totalAdmins = User::where('role', 'admin')->count();

        $totalAnnonces = Annonce::count();
        $annoncesEnAttente = Annonce::where('statut', 'en_attente')->count();
        $annoncesConfirmees = Annonce::where('statut', 'confirmee')->count();
        $annoncesTerminees = Annonce::where('statut', 'terminee')->count();

        $totalInscriptions = Inscription::count();
        $inscriptionsEnAttente = Inscription::where('status', 'en_attente')->count();
        $inscriptionsConfirmees = Inscription::where('status', 'confirmee')->count();
        $inscriptionsAnnulees = Inscription::where('status', 'annulee')->count();

        $scoreTotal = User::sum('score_civique');
        $scoreMoyen = User::avg('score_civique');

        $annonceursVerifies = User::where('role', 'annonceur')->where('is_verified', true)->count();
        $annonceursNonVerifies = User::where('role', 'annonceur')->where('is_verified', false)->count();

        return Inertia::render('Statistiques', [
            'auth' => ['user' => auth()->user()],
            'stats' => [
                'utilisateurs' => [
                    'total' => $totalUtilisateurs,
                    'citoyens' => $totalCitoyens,
                    'annonceurs' => $totalAnnonceurs,
                    'admins' => $totalAdmins,
                ],
                'annonces' => [
                    'total' => $totalAnnonces,
                    'en_attente' => $annoncesEnAttente,
                    'confirmees' => $annoncesConfirmees,
                    'terminees' => $annoncesTerminees,
                ],
                'inscriptions' => [
                    'total' => $totalInscriptions,
                    'en_attente' => $inscriptionsEnAttente,
                    'confirmees' => $inscriptionsConfirmees,
                    'annulees' => $inscriptionsAnnulees,
                ],
                'score' => [
                    'total' => $scoreTotal,
                    'moyen' => round($scoreMoyen, 2),
                ],
                'annonceurs' => [
                    'verifies' => $annonceursVerifies,
                    'non_verifies' => $annonceursNonVerifies,
                ],
            ],
        ]);
    }
}