<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Annonce;

class AnnonceurController extends Controller
{
    public function create(){   
         return Inertia::render('Annonceur/CreateAnnonce', [
             'auth' => ['user' => Auth::user()],
     ]);
}
public function destroy($id){
    $annonce = Annonce::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
    $annonce->delete();
    return redirect()->route('dashboard')->with('success', 'Annonce supprimée avec succès.');
}

    public function store(Request $request){
        $request->validate([
            'titre' => 'required|string|max:55',
            'description' => 'required|string',
            'quartier' => 'required|string|max:55',
            'date_action' => 'required|date',
            'min_participants' => 'required|integer|min:1',
            'max_participants' => 'required|integer|min:1',
        ]);

        Annonce::create([
            'user_id' => Auth::id(),
            'titre' => $request->titre,
            'description' => $request->description,
            'quartier' => $request->quartier,
            'date_action' => $request->date_action,
            'min_participants' => $request->min_participants,
            'max_participants' => $request->max_participants,
            'statut' => 'en_attente',
        ]);
        return redirect()->route('dashboard');
    }
        public function edit($id)
        {
            $annonce = Annonce::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

            return Inertia::render('Annonceur/EditAnnonce', [
                'auth' => ['user' => Auth::user()],
                'annonce' => $annonce,
            ]);
        }

        public function update(Request $request, $id)
        {
            $request->validate([
                'titre' => 'required|string|max:55',
                'description' => 'required|string',
                'quartier' => 'required|string|max:55',
                'date_action' => 'required|date',
                'min_participants' => 'required|integer|min:1',
                'max_participants' => 'required|integer|min:1',
            ]);

            $annonce = Annonce::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

            $annonce->update([
                'titre' => $request->titre,
                'description' => $request->description,
                'quartier' => $request->quartier,
                'date_action' => $request->date_action,
                'min_participants' => $request->min_participants,
                'max_participants' => $request->max_participants,
            ]);

            return redirect()->route('dashboard')->with('success', 'Annonce bien modifiée .');
        }
        public function confirmer($id)
        {
            $annonce = Annonce::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
            $annonce->update([
                'statut' => 'confirmee',
            ]);
            return redirect()->route('dashboard');
        }
            public function terminer($id){
                $annonce = Annonce::where('id', $id)->where('user_id', Auth::id())->withCount('inscriptions')->firstOrFail();

                if ($annonce->inscriptions_count < $annonce->min_participants) {
                    return redirect()->route('dashboard')
                        ->with('error', 'Impossible de terminer : nombre de participants insuffisant.');
                }

                $annonce->update([
                    'statut' => 'terminee',
                ]);

                return redirect()->route('dashboard')->with('success', 'Annonce terminée avec succès.');
            }


         public function mesAnnonces(){
            $user = Auth::user();
            $annonces = $user->annonces()->with(['inscriptions.user'])->get();

            return inertia('Dashboard/Annonceur', [
                'auth' => ['user' => $user],
                'annonces' => $annonces,
            ]);
        }
        public function supprimerCitoyen($annonceId, $inscriptionId){
            $user = Auth::user();
            $annonce = $user->annonces()->findOrFail($annonceId);

            $inscription = $annonce->inscriptions()->findOrFail($inscriptionId);
            $inscription->delete();

            return redirect()->back()->with('success', 'Citoyen supprimé de l’annonce.');
        }
        public function participants($id){
            $user = Auth::user();

            $annonce = $user->annonces()->with(['inscriptions.user'])->findOrFail($id);

            return Inertia::render('Dashboard/Participants', [
                'auth' => ['user' => $user],
                'annonce' => $annonce,
                'citoyens' => $annonce->inscriptions->map(function ($inscription) {
                    return [
                        'id' => $inscription->id,
                        'nom' => $inscription->user->name,
                        'score' => $inscription->user->score_civique,
                    ];
                }),
            ]);
        }
}