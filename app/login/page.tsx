"use client"
import Copyright from '@/components/Copyright';
import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPageClient = () => {
    
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get('redirect') || '/';

    // 🔄 If already logged in, redirect away
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push(redirectTo);
        }
    }, [router, redirectTo]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                setLoading(false);
                return;
            }

            // Save token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccess(true);

            // Slight delay to show success message
            setTimeout(() => {
                router.push(redirectTo);
            }, 1000);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen w-full">
                {/* Left Panel */}
                <div className="relative w-[30%] bg-blue-100 bg-opacity-50 hidden md:block">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/loginpageimage.png')",
                            opacity: 0.3
                        }}
                    />
                    <div className="relative z-10 p-12 flex flex-col h-full justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                            WELCOME TO THE NEW<br />WORLD OF <span className="text-indigo-600">LEGAL<br />RESEARCH</span>
                        </h1>
                        <p className="mt-4 text-gray-800">
                            Empowered by <span className="text-indigo-600">Artificial Intelligence</span>
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-3/5 flex items-center justify-center py-6">
                    <div className="w-full max-w-md px-6">
                        <h2 className="text-4xl font-bold mb-2 text-center">Sign in</h2>
                        <p className="text-gray-600 mb-8 text-center">Enter your details below.</p>

                        <form onSubmit={handleLogin}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 mb-2">
                                    Email Address<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@email.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 mb-2">
                                    Password<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="flex items-center mb-6">
                                <div
                                    className={`relative inline-block w-10 h-6 transition-all rounded-full ${isChecked ? "bg-blue-500" : "bg-gray-300"}`}
                                    onClick={() => setIsChecked(!isChecked)}
                                >
                                    <div
                                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${isChecked ? "translate-x-4" : ""}`}
                                    ></div>
                                </div>
                                <label className="ml-2 text-gray-700 cursor-pointer">
                                    Remember Me
                                </label>
                            </div>

                            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                            {success && <p className="text-green-600 text-sm mb-4 text-center">Login successful! Redirecting...</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-32 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-auto block ${loading ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm">
                                    Need an account?
                                    <a href="/signup" className="text-indigo-600 hover:text-indigo-500 ml-1">Sign up</a>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="text-red-500 hover:text-red-400">Forget your Password?</a>
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-center">
                                <a href="#" className="text-red-500 hover:text-red-400">Click here</a>
                                <span className="text-gray-700"> for IP Access</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />
        </>
    );
};

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageClient />
        </Suspense>
    )
}

export default LoginPage;
