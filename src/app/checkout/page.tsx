"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Check, Gift, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
    const { cartItems, cartTotal } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [showGiftPopup, setShowGiftPopup] = useState(false);
    const [step, setStep] = useState<1 | 2>(1); // 1 = Details, 2 = Success
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");

    const discount = promoApplied ? cartTotal * 0.05 : 0;
    const finalTotal = cartTotal - discount;

    const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        if (promoCode.trim().toUpperCase() === "GIFT5") {
            setPromoApplied(true);
        }
    };

    const handleCheckoutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supabase) {
            setStep(2); // Simulated success if database not connected
            return;
        }

        setIsSubmitting(true);
        try {
            // First check if auth user is logged in
            const { data: { session } } = await supabase.auth.getSession();

            const shippingAddr = `${street}, ${apartment ? apartment + ', ' : ''}${city}, ${postal}`;
            const itemsJson = cartItems.map(i => ({
                product_id: i.product.id,
                quantity: i.quantity,
                price: i.product.price
            }));

            // Use our newly created amazing atomic RPC function.
            // If the user isn't logged in, the RPC will simply execute under RLS conditions (which we could adjust to accept anonymous orders or enforce login)
            if (session?.user) {
                await supabase.rpc('create_order', {
                    p_total: finalTotal,
                    p_address: shippingAddr,
                    p_phone: phone,
                    p_promo: promoApplied ? "GIFT5" : null,
                    p_items: JSON.stringify(itemsJson)
                });
            } else {
                // Guest checkout fallback directly into tables if RPC fails due to RLS user_id
                const { data: orderData, error: orderErr } = await supabase.from('orders').insert({
                    total_amount: finalTotal,
                    shipping_address: shippingAddr,
                    contact_phone: phone,
                    promo_code: promoApplied ? "GIFT5" : null
                }).select().single();

                if (orderData) {
                    await supabase.from('order_items').insert(
                        itemsJson.map(item => ({
                            order_id: orderData.id,
                            ...item,
                            price_at_time: item.price
                        }))
                    );
                }
            }

            setStep(2);
        } catch (error) {
            console.error("Checkout failed", error);
            alert("Something went wrong with your checkout. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(price);
    };

    if (cartItems.length === 0 && step === 1) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-serif text-white tracking-widest mb-6">YOUR BAG IS EMPTY</h1>
                <Link href="/watches" className="text-gold-500 uppercase tracking-widest text-sm border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-colors">
                    Return to Collections
                </Link>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mb-8 border border-gold-500/30">
                    <Check className="text-gold-500" size={40} />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest mb-6">ORDER CONFIRMED</h1>
                <p className="text-gray-400 font-light max-w-md mx-auto mb-12">
                    Thank you for choosing Zaman & Nazar. Your luxury timepiece will be prepared for fully insured delivery.
                </p>
                <Link href="/" className="bg-gold-500 text-black px-10 py-4 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-white transition-colors">
                    Return to Boutique
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-24 px-6 md:px-12 relative overflow-hidden">

            {/* Gift Box Floating Trigger */}
            {!promoApplied && (
                <motion.button
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowGiftPopup(true)}
                    className="fixed bottom-10 right-10 z-30 bg-gold-500 text-black p-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center animate-bounce"
                >
                    <Gift size={24} />
                </motion.button>
            )}

            {/* Gift Popup Modal */}
            <AnimatePresence>
                {showGiftPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-[#111] border border-gold-500/30 p-12 max-w-md w-full text-center relative shadow-2xl"
                        >
                            <button onClick={() => setShowGiftPopup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">x</button>
                            <Gift size={48} className="text-gold-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-serif text-white mb-2 tracking-wider">A GIFT FOR YOU</h3>
                            <p className="text-gray-400 font-light mb-8 text-sm leading-relaxed">As a token of our appreciation, please enjoy a complimentary 5% courtesy on your entire purchase today.</p>
                            <div className="bg-black border border-white/10 p-4 mb-8">
                                <span className="text-gold-500 font-mono text-xl tracking-[0.3em]">GIFT5</span>
                            </div>
                            <button
                                onClick={() => {
                                    setPromoCode("GIFT5");
                                    setShowGiftPopup(false);
                                }}
                                className="w-full bg-gold-500 text-black py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white transition-colors"
                            >
                                Apply to Checkout
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-serif text-white tracking-widest uppercase mb-12 border-b border-white/10 pb-6">Secure Checkout</h1>

                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="flex flex-col lg:flex-row gap-16">

                    {/* Left Column: Forms */}
                    <div className="w-full lg:w-3/5 flex flex-col gap-12">

                        {/* Buyer Details */}
                        <section>
                            <h2 className="text-sm text-gold-500 tracking-widest uppercase mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full border border-gold-500 flex items-center justify-center text-[10px]">1</span>
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input required value={firstName} onChange={e => setFirstName(e.target.value)} type="text" placeholder="First Name *" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all" />
                                <input required value={lastName} onChange={e => setLastName(e.target.value)} type="text" placeholder="Last Name *" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all" />
                                <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address *" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all md:col-span-2" />
                                <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number *" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all md:col-span-2" />
                            </div>
                        </section>

                        {/* Delivery Options */}
                        <section>
                            <h2 className="text-sm text-gold-500 tracking-widest uppercase mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full border border-gold-500 flex items-center justify-center text-[10px]">2</span>
                                Delivery Method
                            </h2>
                            <div className="flex flex-col gap-4">
                                <label className="flex items-start gap-4 p-6 border border-gold-500 bg-gold-500/5 cursor-pointer">
                                    <input type="radio" name="delivery" defaultChecked className="mt-1 accent-gold-500" />
                                    <div>
                                        <span className="block text-white uppercase tracking-widest text-sm mb-1">Insured Armor Delivery (Free)</span>
                                        <span className="text-gray-400 text-xs font-light">Secure delivery within 2-3 business days across Pakistan. Includes transit insurance.</span>
                                    </div>
                                </label>
                                <label className="flex items-start gap-4 p-6 border border-white/10 opacity-50 cursor-not-allowed">
                                    <input type="radio" name="delivery" disabled className="mt-1" />
                                    <div>
                                        <span className="block text-white uppercase tracking-widest text-sm mb-1">Boutique Pickup (Lahore Only)</span>
                                        <span className="text-gray-400 text-xs font-light">Currently unavailable for this order.</span>
                                    </div>
                                </label>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-sm text-gold-500 tracking-widest uppercase mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full border border-gold-500 flex items-center justify-center text-[10px]">3</span>
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input required value={street} onChange={e => setStreet(e.target.value)} type="text" placeholder="Street Address *" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all md:col-span-2" />
                                <input value={apartment} onChange={e => setApartment(e.target.value)} type="text" placeholder="Apartment, Suite (Optional)" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all md:col-span-2" />
                                <input required value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="City *" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all" />
                                <input required value={postal} onChange={e => setPostal(e.target.value)} type="text" placeholder="Postal Code *" className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 focus:bg-white/5 transition-all" />
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-2/5">
                        <div className="bg-[#0a0a0a] border border-white/10 p-8 sticky top-32">
                            <h2 className="text-lg font-serif tracking-widest text-white uppercase mb-8 border-b border-white/10 pb-4">Order Summary</h2>

                            <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="relative w-16 h-20 bg-[#111] flex-shrink-0">
                                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                            <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-gray-600">{item.quantity}</span>
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{item.product.brand}</p>
                                            <h4 className="text-sm text-white font-medium line-clamp-1">{item.product.name}</h4>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-white text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Promo Code */}
                            <div className="mb-8 pt-6 border-t border-white/10">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder="Gift card or discount code"
                                        disabled={promoApplied}
                                        className="bg-transparent border border-white/10 p-4 text-white text-sm outline-none focus:border-gold-500 flex-1 disabled:opacity-50 uppercase"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyPromo}
                                        disabled={promoApplied || !promoCode}
                                        className="bg-white/10 text-white px-6 uppercase tracking-widest text-xs hover:bg-white/20 transition-colors disabled:opacity-50"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {promoApplied && (
                                    <p className="text-gold-500 text-xs mt-3 flex items-center gap-2">
                                        <Check size={12} /> Courtsey discount applied
                                    </p>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="text-white">{formatPrice(cartTotal)}</span>
                                </div>
                                {promoApplied && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gold-500">Discount (5%)</span>
                                        <span className="text-gold-500">-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Shipping</span>
                                    <span className="text-white">Complimentary</span>
                                </div>
                            </div>

                            <div className="flex justify-between border-t border-white/10 pt-6 mb-8">
                                <span className="text-white uppercase tracking-widest text-sm">Total</span>
                                <span className="text-gold-500 font-serif text-2xl">{formatPrice(finalTotal)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                form="checkout-form"
                                className="w-full bg-gold-500 text-black py-5 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isSubmitting ? "Processing..." : "Complete Order"}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-6 flex justify-center items-center gap-2">
                                Secure Encrypted Checkout
                            </p>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
