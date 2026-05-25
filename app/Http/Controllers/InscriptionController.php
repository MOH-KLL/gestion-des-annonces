<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Inscription;
use App\Models\Annonce;

class InscriptionController extends Controller
{
    public function store(Annonce $annonce){

    $user = Auth::user();
    $existe = Inscription::where('user_id', $user->id)->where('annonce_id', $annonce->id)->exists();
    if ($existe) { return back(); }
    Inscription::create([
        'user_id' => $user->id,
        'annonce_id' => $annonce->id,
        'status' => 'en_attente',
    ]);

    return back();
}

    public function destroy(Inscription $inscription){
        
    if ($inscription->user_id === Auth::id()) {
        $inscription->delete();
        return back();
    }
    return back();
        }
    public function annulerToutes(){

        $user = Auth::user();
        Inscription::where('user_id', $user->id)->where('status', 'en_attente')->delete();
        return back();
}}