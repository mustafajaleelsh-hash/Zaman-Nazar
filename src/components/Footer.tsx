import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1 border-r border-white/10 pr-6">
                        <div className="relative h-12 w-48 mb-6">
                            <Image
                                src="/images/logo.png"
                                alt="Zaman & Nazar"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Curating the world's finest timepieces and eyewear. A testament to luxury,
                            precision, and timeless elegance.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm tracking-widest uppercase text-white mb-6 font-semibold">Collections</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/watches" className="hover:text-gold-500 transition-colors">Luxury Watches</Link></li>
                            <li><Link href="/glasses" className="hover:text-gold-500 transition-colors">Premium Eyewear</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-gold-500 transition-colors">New Arrivals</Link></li>
                            <li><Link href="/classics" className="hover:text-gold-500 transition-colors">The Classics</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm tracking-widest uppercase text-white mb-6 font-semibold">Customer Care</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-gold-500 transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/warranty" className="hover:text-gold-500 transition-colors">Warranty</Link></li>
                            <li><Link href="/faq" className="hover:text-gold-500 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm tracking-widest uppercase text-white mb-6 font-semibold">Join the Club</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex mb-6">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-transparent border-b border-white/20 px-0 py-2 text-sm text-white w-full focus:outline-none focus:border-gold-500 transition-colors"
                            />
                            <button type="submit" className="border-b border-white/20 text-gold-500 hover:text-white transition-colors uppercase tracking-widest text-xs px-2">
                                Subscribe
                            </button>
                        </form>
                        <div className="flex space-x-4 text-gray-400">
                            <a href="#" className="hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-gold-500 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 tracking-wider">
                    <p>&copy; {new Date().getFullYear()} ZAMAN & NAZAR. All Rights Reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
