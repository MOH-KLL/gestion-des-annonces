<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Inscription;

class CitoyenController extends Controller
{
    public function mesInscriptions()
    {
        $user = Auth::user();
        $score = $user->score_civique;

        $inscriptions = Inscription::with('annonce')->where('user_id', $user->id)->get();

        return inertia('MesInscriptions', [
            'inscriptions' => $inscriptions ,
            'score'=> $score
        ]);
    }
}
