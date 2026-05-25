import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Navbar({ auth }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <nav className="flex justify-between items-center py-2 px-5 bg-white dark:bg-gray-900 shadow">
            <div className="flex items-center space-x-2">
                <Link  href="/" >
                <img  src="/images/logo.webp"  className="h-10 w-10 object-contain" />
                </Link>
                <Link  href="/">  <span>SNA</span> </Link> 
            </div>
            <div className="flex gap-4 items-center">
                    <>
                        <Link href='/'
                            className="rounded-md px-3 py-2 text-black hover:text-gray-600 transition dark:text-white dark:hover:text-gray-300">
                            Accueil </Link>

                            {auth.user ? (
                                <>
                                    <Link href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black hover:text-gray-600 transition dark:text-white dark:hover:text-gray-300">
                                        Dashboard </Link>
                                    <Link
                                        href={route('logout')} method="post"
                                        className="rounded-md px-3 py-2 text-red-600 hover:text-red-800 transition dark:text-red-400 dark:hover:text-red-600"
                                    > Se déconnecter </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')}
                                        className="rounded-md px-3 py-2 text-black hover:text-gray-600 transition dark:text-white dark:hover:text-gray-300">
                                        Se connecter </Link>
                                    <Link href={route('register')}
                                        className="rounded-md px-3 py-2 text-black hover:text-gray-600 transition dark:text-white dark:hover:text-gray-300">
                                        S'inscrire </Link>
                                </>
                            )}

                        <Link href={route('propos')} className="rounded-md px-3 py-2 text-black hover:text-gray-600 transition dark:text-white dark:hover:text-gray-300">
                            A propos </Link>
                    </>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="ml-4 px-3 py-2 rounded-md bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition">
                    {darkMode ? '☀️' : '🌙'} </button>
            </div>
        </nav>
    );
}