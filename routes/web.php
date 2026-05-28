<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnonceurController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CitoyenController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::middleware('auth')->group(function () {

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::post('/inscription/{annonce}', [InscriptionController::class, 'store'])->name('inscription.store');
    Route::delete('/inscription/{inscription}', [InscriptionController::class, 'destroy'])->name('inscription.destroy');
    Route::delete('/inscriptions/annuler-toutes', [InscriptionController::class, 'annulerToutes'])->name('inscription.annulerToutes');

    Route::get('/citoyen/inscriptions', [CitoyenController::class, 'mesInscriptions'])->name('citoyen.inscriptions');
    Route::get('/citoyen/profil', fn() => inertia('Profile/Edit'))->name('citoyen.profil');

    Route::get('/annonceur/annonce/create', [AnnonceurController::class, 'create'])->name('annonceur.create');
    Route::post('/annonceur/annonce/store', [AnnonceurController::class, 'store'])->name('annonceur.store');
    Route::get('/annonceur/mes-annonces', [AnnonceurController::class, 'mesAnnonces'])->name('annonceur.mesAnnonces');
    Route::delete('/annonceur/annonce/{id}', [AnnonceurController::class, 'destroy'])->name('annonceur.destroy');

    Route::get('/annonceur/annonce/{id}/edit', [AnnonceurController::class, 'edit'])->name('annonceur.edit');

    Route::put('/annonceur/annonce/{id}', [AnnonceurController::class, 'update'])->name('annonceur.update');
    Route::put('/annonceur/annonce/{id}/confirmer', [AnnonceurController::class, 'confirmer'])->name('annonceur.confirmer');
    Route::put('/annonceur/annonce/{id}/terminer', [AnnonceurController::class, 'terminer'])->name('annonceur.terminer');

    Route::get('/annonceur/annonce/{id}/participants', [AnnonceurController::class, 'participants'])->name('annonceur.participants');

    
    Route::delete('/annonceur/annonce/{annonce}/citoyen/{inscription}', [AnnonceurController::class, 'supprimerCitoyen'])->name('annonceur.supprimerCitoyen');
    Route::delete('/admin/citoyen/{id}', [AdminController::class, 'supprimerCitoyen'])->name('admin.supprimerCitoyen');
    Route::put('/admin/annonceur/{id}/confirmer', [AdminController::class, 'confirmerAnnonceur'])->name('admin.confirmerAnnonceur');

    Route::put('/admin/annonceur/{id}/rejeter', [AdminController::class, 'rejeterAnnonceur'])->name('admin.rejeterAnnonceur');
    Route::delete('/admin/annonceur/{id}', [AdminController::class, 'supprimerAnnonceur'])->name('admin.supprimerAnnonceur');
    Route::delete('/admin/annonce/{id}', [AdminController::class, 'supprimerAnnonce'])->name('admin.supprimerAnnonce');
    Route::delete('/admin/inscription/{id}', [AdminController::class, 'supprimerInscription'])->name('admin.supprimerInscription');


    Route::get('/profil', [ProfileController::class, 'index'])->middleware('auth')->name('profil');
    Route::put('/profil/infos', [ProfileController::class, 'updateInfos'])->middleware('auth')->name('profil.updateInfos');
    Route::put('/profil/password', [ProfileController::class, 'updatePassword'])->middleware('auth')->name('profil.updatePassword');

    Route::get('/statistiques', [StatsController::class, 'index'])->middleware('auth')->name('statistiques');

    Route::get('/annonceur/presence/{id}', [AnnonceurController::class, 'presence'])->middleware('auth')->name('annonceur.presence');
    Route::post('/annonceur/presence/{id}', [AnnonceurController::class, 'presenceStore'])->middleware('auth')->name('annonceur.presenceStore');
});


Route::get('/propos', fn() => Inertia::render('Propos'))->name('propos');
Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');


Route::post('/inscription-citoyen', [RegisteredUserController::class, 'inscrireCitoyen'])->name('inscription.citoyen.store');
Route::post('/inscription-annonceur', [RegisteredUserController::class, 'inscrireAnnonceur'])->name('inscription.annonceur.store');

require __DIR__.'/auth.php';