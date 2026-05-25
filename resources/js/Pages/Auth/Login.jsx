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
            <Navbar auth={auth} />

            <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded shadow">

                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                    Bienvenue sur notre plateforme
                </h1>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
                    Heureux de vous revoir
                </p>

                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                             e-mail
                        </label>
                        <input type="email" name="email" value={data.email}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {(errors.email || errors.password) && (
                            <p className="mt-2 text-sm text-red-600">Email ou mot de passe invalide</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mot de passe
                        </label>
                        <input type="password" name="password" value={data.password}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-end">
                        <button type="submit"
                            className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                        > Se connecter </button>
                    </div>
                </form>
            </div>
        </>
    );
}