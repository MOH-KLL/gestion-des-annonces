import Navbar from "@/Components/Navbar";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Profil({ auth }) {
    const user = auth.user;
    
    const [onglet, setOnglet] = useState("informations");

    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const submitInfos = (e) => {
        e.preventDefault();
        put(route("profil.updateInfos"), {
            onSuccess: () => alert("Informations enregistrées !")
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        put(route("profil.updatePassword"), {
            onSuccess: () => {
                alert("Mot de passe changé !");
                setData({
                    ...data,
                    current_password: "",
                    new_password: "",
                    new_password_confirmation: "",
                });
            }
        });
    };

    return (
        <>
            <Head title="Mon profil" />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <Navbar auth={auth} />

                <main className="relative z-10 pt-24 pb-12 px-4 max-w-2xl mx-auto">
                    
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Mon profil
                    </h1>

                    <div className="flex gap-2 mb-6">
                        <button onClick={() => setOnglet("informations")}
                            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                                onglet === "informations"
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10"
                            }`}>
                            Informations
                        </button>
                        <button onClick={() => setOnglet("motdepasse")}
                            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                                onglet === "motdepasse"
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10"
                            }`}>
                            Changer le mot de passe
                        </button>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-6">
                        
                        {onglet === "informations" && (
                            <form onSubmit={submitInfos} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Nom</label>
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Rôle</label>
                                    <div className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-400 capitalize">
                                        {user.role}
                                    </div>
                                </div>

                                {user.role === "annonceur" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Organisation</label>
                                        <div className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-400">
                                            {user.nom_organisation || "Non défini"}
                                        </div>
                                    </div>
                                )}

                                <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all">
                                    Enregistrer
                                </button>
                            </form>
                        )}

                        {onglet === "motdepasse" && (
                            <form onSubmit={submitPassword} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Mot de passe actuel</label>
                                    <input type="password" value={data.current_password} onChange={(e) => setData("current_password", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                    {errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Nouveau mot de passe</label>
                                    <input type="password" value={data.new_password}
                                        onChange={(e) => setData("new_password", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                    {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Confirmer le mot de passe</label>
                                    <input type="password" value={data.new_password_confirmation}
                                        onChange={(e) => setData("new_password_confirmation", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                    {errors.new_password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.new_password_confirmation}</p>}
                                </div>

                                <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all">
                                    Changer le mot de passe
                                </button>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}