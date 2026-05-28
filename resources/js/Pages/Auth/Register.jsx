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
            post(route('inscription.citoyen.store'), { data });
        } else {
            post(route('inscription.annonceur.store'), { data });
        }
    };

    return (
        <>
            <Head title="Inscription" />
            <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <Navbar auth={auth} />

                <main className="relative pt-24 pb-32 px-4 flex items-center justify-center min-h-screen">
                    
                    <div className="w-full max-w-md">
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-8">
                            
                            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                                Créez votre compte
                            </h1>

                            <div className="flex gap-4 mb-8 justify-center p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
                                <button 
                                    type="button" 
                                    onClick={() => setRole('citoyen')}
                                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                        role === 'citoyen'
                                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                                    }`} > Citoyen 
                                </button>
                                <button  type="button" onClick={() => setRole('annonceur')}
                                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                        role === 'annonceur'
                                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'}`}> 
                                    Annonceur 
                                </button>
                            </div>

                            <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Nom
                                    </label>
                                    <input name="name" value={data.name}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        onChange={(e) => setData('name', e.target.value)} required />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Email
                                    </label>
                                    <input type="email" name="email" value={data.email}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        onChange={(e) => setData('email', e.target.value)} required />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Mot de passe
                                    </label>
                                    <input  type="password" name="password" value={data.password} 
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        onChange={(e) => setData('password', e.target.value)} required />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Confirmer mot de passe
                                    </label>
                                    <input type="password" name="password_confirmation" value={data.password_confirmation}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        onChange={(e) => setData('password_confirmation', e.target.value)} required />
                                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                                </div>

                                {role === 'annonceur' && (
                                    <div className="space-y-4 pt-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                Nom de l'organisation
                                            </label>
                                            <input  name="nom_organisation" value={data.nom_organisation} 
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                onChange={(e) => setData('nom_organisation', e.target.value)} required />
                                            {errors.nom_organisation && <p className="text-red-500 text-xs mt-1">{errors.nom_organisation}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                Document d'identité
                                            </label>
                                            <div className="relative">
                                                <input  type="file" name="document_identite" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 transition-all cursor-pointer"
                                                    onChange={(e) => setData('document_identite', e.target.files[0])} />
                                            </div>
                                            {errors.document_identite && <p className="text-red-500 text-xs mt-1">{errors.document_identite}</p>}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                                    <Link href={route('login')} className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        Déjà inscrit ? 
                                    </Link>

                                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all">
                                        S'inscrire
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}