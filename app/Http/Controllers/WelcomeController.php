<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Annonce;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $annonceursCount = User::where('role', 'annonceur')->count();
        $annoncesCount = Annonce::count();
        $citoyensCount = User::where('role', 'citoyen')->count();

        return Inertia::render('Welcome',compact("annonceursCount", "annoncesCount", "citoyensCount"));
    }
}
