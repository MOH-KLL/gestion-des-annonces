import Navbar from '@/Components/Navbar';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register({ auth }) {
    const [role, setRole] = useState('citoyen');

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        nom_organisation: '',
        document_identite: null,
        role: 'citoyen',
    });

    const submit = (e) => {
        e.preventDefault();

        if (role === 'citoyen') {
            post(route('inscription.citoyen.store'), {data});
        } else {
            post(route('inscription.annonceur.store'), {data});
        }
    };

    return (
        <>
            <Head title="Inscription" />
            <Navbar auth={auth} />

            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
                        Créez votre compte
                    </h1>

                    <div className="flex gap-4 mb-6 justify-center">
                        <button type="button" onClick={() => setRole('citoyen')}
                            className={`px-4 py-2 rounded ${ role === 'citoyen'
                             ? 'bg-black text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white' }`}> Citoyen </button>
                        <button type="button"
                            onClick={() => setRole('annonceur')}
                            className={`px-4 py-2 rounded ${ role === 'annonceur'
                            ? 'bg-black text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white' }`}
                        > Annonceur </button>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div>
                            <label>Nom</label>
                            <input name="name" value={data.name}
                                className="mt-1 block w-full border rounded p-2" onChange={(e) => setData('name', e.target.value)} required/>
                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                        </div>

                        <div className="mt-4">
                            <label>Email</label>
                            <input type="email" name="email" value={data.email}
                                className="mt-1 block w-full border rounded p-2"
                                onChange={(e) => setData('email', e.target.value)} required />
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                        </div>

                        <div className="mt-4">
                            <label>Mot de passe</label>
                            <input  type="password" name="password" value={data.password} className="mt-1 block w-full border rounded p-2"
                                onChange={(e) => setData('password', e.target.value)} required />
                            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                        </div>

                        <div className="mt-4">
                            <label> Confirmer mot de passe </label>
                            <input type="password" name="password_confirmation" value={data.password_confirmation}
                                className="mt-1 block w-full border rounded p-2"
                                onChange={(e) => setData('password_confirmation', e.target.value)} required/>
                            {errors.password_confirmation && <p className="text-red-500 text-sm mt-2">{errors.password_confirmation}</p>}
                        </div>

                        {role === 'annonceur' && (
                            <>
                                <div className="mt-4">
                                    <label>Nom de l'organisation</label>
                                    <input  name="nom_organisation" value={data.nom_organisation} className="mt-1 block w-full border rounded p-2"
                                        onChange={(e) => setData('nom_organisation', e.target.value)} required />
                                    {errors.nom_organisation && <p className="text-red-500 text-sm mt-2">{errors.nom_organisation}</p>}
                                </div>
                                <div className="mt-4">
                                    <label>Document d'identité</label>
                                    <input  type="file" name="document_identite" className="mt-1 block w-full border rounded p-2"
                                        onChange={(e) => setData('document_identite', e.target.files[0])} />
                                    {errors.document_identite && <p className="text-red-500 text-sm mt-2">{errors.document_identite}</p>}
                                </div>
                            </>
                        )}

                        <div className="mt-6 flex items-center justify-between">
                            <Link href={route('login')}
                                className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                Déjà inscrit ? </Link>

                            <button type="submit" className="ms-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                                S'inscrire </button>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="py-8 text-center text-sm text-black dark:text-white/70">
                © 2026 SNA - Tous droits réservés 
            </footer>
        </>
    );
}