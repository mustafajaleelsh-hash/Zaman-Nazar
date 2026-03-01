"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supabase) {
            alert("⚠️ Supabase API keys are not configured yet! Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file to activate live authentication.");
            return;
        }

        setIsLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Just redirect directly to home for seamless experience
                router.push("/");
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: name },
                    },
                });
                if (error) throw error;
                alert("Sign up successfully! Please sign in.");
                setIsLogin(true);
            }
        } catch (error: any) {
            alert(error.message || "An authentication error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 relative z-10 shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif tracking-widest text-white mb-2">
                        {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
                    </h1>
                    <p className="text-gray-400 text-sm font-light">
                        {isLogin ? "Access your high-end collections." : "Join the exclusive Zaman & Nazar club."}
                    </p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleAuth}>
                    {!isLogin && (
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-gray-500">Full Name *</label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-gold-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-3">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Email Address *</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-gold-500 transition-colors"
                            placeholder="you@domain.com"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Password *</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-gold-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {isLogin && (
                        <div className="flex justify-end">
                            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gold-500 text-black py-4 mt-4 uppercase tracking-widest text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Authenticating..." : isLogin ? "Sign In" : "Register"}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-white/10 pt-8">
                    <p className="text-sm text-gray-500">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-gold-500 hover:text-white transition-colors uppercase tracking-widest text-xs"
                        >
                            {isLogin ? "Sign Up" : "Log In"}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
