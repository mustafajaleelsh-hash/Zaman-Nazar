"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Filter, ChevronDown } from "lucide-react";

interface ProductGridProps {
    title: string;
    description: string;
    products: Product[];
    category: "watches" | "glasses";
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, description, products, category }) => {
    const { addToCart } = useCart();
    const [sortOrder, setSortOrder] = useState<"featured" | "price-asc" | "price-desc">("featured");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "price-asc") return a.price - b.price;
        if (sortOrder === "price-desc") return b.price - a.price;
        return 0; // featured (default order)
    });

    return (
        <div className="min-h-screen bg-background pt-12 pb-24 px-6 md:px-12">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground tracking-widest uppercase mb-6"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-foreground/70 max-w-2xl mx-auto tracking-wide font-light"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-border gap-6">
                    <div className="text-sm text-foreground/70 tracking-widest uppercase">
                        Showing {products.length} Products
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-sm text-foreground uppercase tracking-widest hover:text-gold-500 transition-colors">
                            <Filter size={16} />
                            Filter
                        </button>
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-sm text-foreground uppercase tracking-widest hover:text-gold-500 transition-colors">
                                Sort By
                                <ChevronDown size={14} />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-panel border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-2xl">
                                <button
                                    onClick={() => setSortOrder("featured")}
                                    className={`w-full text-left px-4 py-3 text-xs tracking-widest uppercase hover:bg-foreground/5 transition-colors ${sortOrder === "featured" ? "text-gold-500" : "text-foreground/70"}`}
                                >
                                    Featured
                                </button>
                                <button
                                    onClick={() => setSortOrder("price-asc")}
                                    className={`w-full text-left px-4 py-3 text-xs tracking-widest uppercase hover:bg-foreground/5 transition-colors ${sortOrder === "price-asc" ? "text-gold-500" : "text-foreground/70"}`}
                                >
                                    Price: Low to High
                                </button>
                                <button
                                    onClick={() => setSortOrder("price-desc")}
                                    className={`w-full text-left px-4 py-3 text-xs tracking-widest uppercase hover:bg-foreground/5 transition-colors ${sortOrder === "price-desc" ? "text-gold-500" : "text-foreground/70"}`}
                                >
                                    Price: High to Low
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {sortedProducts.map((product, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            key={product.id}
                            className="group cursor-pointer flex flex-col"
                        >
                            <Link href={`/product/${product.id}`} className="relative h-[450px] w-full bg-panel overflow-hidden mb-6 block">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                        className="bg-gold-500 text-background px-6 py-4 uppercase tracking-widest text-xs font-semibold w-full hover:bg-foreground transition-colors"
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </Link>

                            <Link href={`/product/${product.id}`} className="text-center px-4 flex-1 flex flex-col">
                                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">{product.brand}</p>
                                <h4 className="text-lg text-foreground font-medium mb-3 group-hover:text-gold-500 transition-colors flex-1">{product.name}</h4>
                                <p className="text-gold-500 font-serif text-xl tracking-wider">
                                    {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(product.price)}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
