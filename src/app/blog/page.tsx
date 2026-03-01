import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "The Art of the Complication: A Journey Through Time",
            excerpt: "Explore the intricate mechanisms that power the world's most prestigious timepieces, from perpetual calendars to tourbillons.",
            category: "Watches",
            date: "October 15, 2026",
            image: "/images/submariner_watch.png",
        },
        {
            id: "2",
            title: "Why A Premium Pair of Glasses is the Ultimate Accessory",
            date: "November 5, 2026",
            category: "Style & Fashion",
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
            excerpt: "From Cartier to Maybach, discovering why eyewear remains the most prominent statement piece you can own."
        },
        {
            id: "3",
            title: "Understanding Watch Movements: Automatic vs. Manual",
            date: "December 20, 2026",
            category: "Horology Basics",
            image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=800",
            excerpt: "A connoisseur's guide to the beating hearts of luxury timepieces and how to select the right one."
        }
    ];

    return (
        <div className="min-h-screen bg-black pt-12 pb-24 px-6 md:px-12">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-widest uppercase mb-6 text-center">Editorial</h1>
                <p className="text-gray-400 max-w-2xl mx-auto tracking-wide font-light mb-16 text-center">
                    Insights, history, and style advice curated by the experts at Zaman & Nazar.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map(post => (
                        <div key={post.id} className="group cursor-pointer">
                            <div className="relative h-[300px] bg-[#111] overflow-hidden mb-6">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gold-500 mb-3 font-semibold">
                                    <span>{post.category}</span>
                                    <span className="text-gray-600">{post.date}</span>
                                </div>
                                <h2 className="text-xl font-serif text-white mb-3 group-hover:text-gold-500 transition-colors leading-snug">{post.title}</h2>
                                <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">{post.excerpt}</p>
                                <Link href={`#`} className="text-xs uppercase tracking-widest text-white border-b border-gold-500 pb-1 self-start hover:text-gold-500 transition-colors">
                                    Read Article
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
