import Navbar from '@/Components/Navbar';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
    
    return (
        <>
            <Head title="Se connecter" />
            
            <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <Navbar auth={auth} />

                <main className="relative pt-24 pb-32 px-4 flex items-center justify-center min-h-screen">
                    
                    <div className="w-full max-w-md">
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-8">
                            
                            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                                Bienvenue sur notre plateforme
                            </h1>
                            <p className="text-lg text-center text-gray-600 dark:text-slate-400 mb-8">
                                Heureux de vous revoir
                            </p>

                            <form onSubmit={submit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        E-mail
                                    </label>
                                    <input type="email" name="email" value={data.email}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        onChange={(e) => setData('email', e.target.value)} />
                                    {(errors.email || errors.password) && (
                                        <p className="mt-2 text-sm text-red-500">Email ou mot de passe invalide</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                        Mot de passe
                                    </label>
                                    <input type="password" name="password" value={data.password}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        onChange={(e) => setData('password', e.target.value)}/>
                                </div>

                                <div className="mt-6 flex items-center justify-end">
                                    <button type="submit"
                                        className="ml-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all">
                                        Se connecter
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