"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { supabase } from "@/lib/supabase";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const pathname = usePathname();

    const handleLogout = async () => {
        await supabase?.auth.signOut();
        setIsDropdownOpen(false);
    };

    const searchResults = (productsData as Product[]).filter((p) =>
        searchQuery.length > 1 &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 4);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!supabase) return;

        const getSession = async () => {
            const { data: { session } } = await supabase!.auth.getSession();
            setUser(session?.user ?? null);
        };
        getSession();

        const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Watches", href: "/watches" },
        { name: "Glasses", href: "/glasses" },
        { name: "Editorial", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-border py-4"
                : "bg-transparent border-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Mobile Menu & Search Button */}
                <div className="md:hidden flex space-x-4 items-center">
                    <ThemeToggle />
                    <button
                        className="text-foreground hover:text-gold-500 transition-colors"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={22} />
                    </button>
                    <button
                        className="text-foreground hover:text-gold-500 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Logo */}
                <Link href="/" className="relative h-12 w-48 md:h-16 md:w-56 hover:opacity-80 transition-opacity">
                    <Image
                        src="/images/logo.png"
                        alt="Zaman & Nazar"
                        fill
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm uppercase tracking-widest transition-colors ${pathname === link.href ? "text-gold-500" : "text-foreground/80 hover:text-foreground"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-6 text-foreground transition-colors duration-300">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hidden md:block hover:text-gold-500 transition-colors"
                    >
                        <Search size={20} />
                    </button>
                    {user ? (
                        <div
                            className="relative hidden md:block"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <button className="flex items-center justify-center hover:opacity-80 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-gold-500 text-background flex items-center justify-center text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                    {user.user_metadata?.full_name?.substring(0, 2) || user.email?.substring(0, 2) || "U"}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 bg-background border border-border shadow-2xl z-50 py-2"
                                    >
                                        <div className="px-4 py-3 border-b border-border mb-2">
                                            <p className="text-sm text-foreground font-semibold truncate">{user.user_metadata?.full_name || 'Valued Client'}</p>
                                            <p className="text-xs text-foreground/50 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => { setIsDropdownOpen(false); alert("Orders functionality coming soon!"); }}
                                            className="w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-foreground/80 hover:text-gold-500 hover:bg-foreground/5 transition-colors"
                                        >
                                            My Orders
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-foreground/5 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link href="/login" className="hidden md:block hover:text-gold-500 transition-colors">
                            <User size={20} />
                        </Link>
                    )}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative hover:text-gold-500 transition-colors group"
                    >
                        <ShoppingBag size={20} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-2 -right-2 bg-gold-500 text-background text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center group-hover:bg-gold-400 transition-colors"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-background z-50 flex flex-col pt-24 px-8"
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-foreground hover:text-gold-500 transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <div className="flex flex-col space-y-8 mt-12">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-4xl font-serif text-foreground hover:text-gold-500 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto mb-12 border-t border-border pt-12 flex space-x-6">
                            <a href="#" className="text-foreground/70 hover:text-gold-500">Instagram</a>
                            <a href="#" className="text-foreground/70 hover:text-gold-500">Facebook</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Dropdown */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 shadow-2xl"
                    >
                        <div className="container mx-auto px-6 md:px-12 py-8 relative">
                            <button
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery("");
                                }}
                                className="absolute top-8 right-6 md:right-12 text-foreground/70 hover:text-foreground transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="w-full max-w-3xl mx-auto">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search watches, brands, or glasses..."
                                    className="bg-transparent border-b border-border pb-4 text-xl md:text-3xl text-foreground font-serif outline-none focus:border-gold-500 transition-colors placeholder:text-foreground/20 w-full"
                                    autoFocus
                                />

                                {/* Search Results */}
                                {searchQuery.length > 1 && (
                                    <div className="mt-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                        <div className="flex justify-between items-end border-b border-border pb-4 mb-6">
                                            <h3 className="text-xs uppercase tracking-widest text-foreground/70">Results ({searchResults.length})</h3>
                                        </div>

                                        {searchResults.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {searchResults.map((product) => (
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        key={product.id}
                                                        onClick={() => {
                                                            setIsSearchOpen(false);
                                                            setSearchQuery("");
                                                        }}
                                                        className="flex gap-6 group hover:bg-foreground/5 p-3 rounded-sm transition-colors"
                                                    >
                                                        <div className="relative w-20 h-24 bg-panel flex-shrink-0">
                                                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <p className="text-[10px] uppercase tracking-widest text-gold-500 mb-1">{product.brand}</p>
                                                            <h4 className="text-sm md:text-base text-foreground font-serif mb-1 group-hover:text-gold-500 transition-colors line-clamp-1">{product.name}</h4>
                                                            <p className="text-foreground text-sm">
                                                                {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(product.price)}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-foreground/50 font-light tracking-wide text-sm text-center py-8">No products found matching "{searchQuery}"</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
