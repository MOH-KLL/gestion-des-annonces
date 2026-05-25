<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function inscrireCitoyen(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:55',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->role = 'citoyen';
        $user->score_civique = 0;
        $user->save();

        Auth::login($user);
        return redirect()->route('dashboard');
    }

    public function inscrireAnnonceur(Request $request)
    {
        $request->validate([
            'name'             => 'required|string|max:55',
            'email'            => 'required|string|lowercase|email|max:255|unique:users',
            'password'         => 'required', 'confirmed',
            'nom_organisation' => 'required|string|max:55',
            'document_identite'=> 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $documentPath = null;
        if ($request->hasFile('document_identite')) {
            $documentPath = $request->file('document_identite')->store('documents', 'public');
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->role = 'annonceur';
        $user->nom_organisation = $request->nom_organisation;
        $user->document_identite = $documentPath;
        $user->is_verified = false;
        $user->save();

        Auth::login($user);
        return redirect()->route('dashboard');
    }
}