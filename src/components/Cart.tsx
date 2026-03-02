"use client";

import React from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Cart = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-PK", {
            style: "currency",
            currency: "PKR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-background border-l border-border shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="h-24 px-6 md:px-10 flex items-center justify-between border-b border-border">
                            <h2 className="text-xl font-serif tracking-widest text-foreground">YOUR CART</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-foreground/70 hover:text-gold-500 transition-colors p-2"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-foreground/50 space-y-6">
                                    <ShoppingBag size={48} className="opacity-20" />
                                    <p className="tracking-widest uppercase text-sm">Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-8 border border-gold-500 text-gold-500 px-8 py-3 uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-background transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {cartItems.map((item) => (
                                        <div key={item.product.id} className="flex gap-6 group">
                                            {/* Image */}
                                            <div className="relative w-24 h-32 bg-panel overflow-hidden">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">{item.product.brand}</p>
                                                    <h3 className="text-sm font-medium text-foreground">{item.product.name}</h3>
                                                    <p className="text-gold-500 mt-2 text-sm">{formatPrice(item.product.price)}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center border border-border">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-xs text-foreground/50 uppercase tracking-wider hover:text-red-500 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-border p-6 md:p-10 bg-background">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sm uppercase tracking-widest text-foreground/70">Subtotal</span>
                                    <span className="text-xl font-serif text-gold-500">{formatPrice(cartTotal)}</span>
                                </div>
                                <p className="text-xs text-foreground/60 mb-8 border-b border-foreground/5 pb-6">
                                    Taxes and shipping calculated at checkout.
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="block w-full text-center bg-gold-500 text-background py-4 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-foreground transition-colors duration-300"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
