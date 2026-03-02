"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&q=80&w=2000",
    title1: "MASTERING",
    title2: "TIME & VISION",
    subtitle: "Curators of the world's most distinguished timepieces and exceptional eyewear since 1999."
  },
  {
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000",
    title1: "ICONIC",
    title2: "LUXURY SPORTS",
    subtitle: "Experience the zenith of robust elegance with our curated sports models."
  },
  {
    image: "/images/slider_eyewear.png",
    title1: "AVANT-GARDE",
    title2: "EYEWEAR",
    subtitle: "Define your style with frames forged from gold, titanium, and horn."
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Get some featured products
  const featuredProducts = (productsData as Product[]).filter(
    (p) => ["w1", "w3", "g1", "g4"].includes(p.id)
  );

  return (
    <div className="flex flex-col items-center overflow-hidden">

      {/* Hero Slider Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-background/40 z-10" />
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={HERO_SLIDES[currentSlide].image}
                alt="Hero Slide"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-[family-name:var(--font-playfair)] font-bold tracking-tight text-foreground mb-6 leading-[0.9] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
                {HERO_SLIDES[currentSlide].title1} <br />
                <span className="text-gold-500 italic font-light drop-shadow-[0_10px_25px_rgba(212,175,55,0.4)]">{HERO_SLIDES[currentSlide].title2}</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="text-foreground/90 text-lg md:text-xl tracking-widest uppercase mb-12 max-w-2xl mx-auto font-light drop-shadow-md"
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 w-full justify-center"
          >
            <Link
              href="/watches"
              className="px-10 py-4 bg-gold-500 text-background font-semibold uppercase tracking-[0.2em] text-sm hover:bg-foreground transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Explore Watches
            </Link>
            <Link
              href="/glasses"
              className="px-10 py-4 border border-foreground text-foreground font-semibold uppercase tracking-[0.2em] text-sm hover:bg-foreground hover:text-background transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Explore Glasses
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 z-20 flex gap-4">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all duration-300 ${currentSlide === idx ? "w-12 bg-gold-500" : "w-6 bg-foreground/30"}`}
            />
          ))}
        </div>
      </section>

      {/* Trust & Guarantees Section */}
      <section className="w-full py-16 bg-panel border-y border-foreground/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="px-6 py-4 md:py-0">
              <h4 className="text-gold-500 tracking-widest uppercase mb-3 text-sm font-semibold">Free Insured Shipping</h4>
              <p className="text-foreground/70 text-sm font-light">Secure delivery across Pakistan via armored couriers.</p>
            </div>
            <div className="px-6 py-4 md:py-0">
              <h4 className="text-gold-500 tracking-widest uppercase mb-3 text-sm font-semibold">2-Year International Warranty</h4>
              <p className="text-foreground/70 text-sm font-light">Comprehensive coverage on all our luxury timepieces.</p>
            </div>
            <div className="px-6 py-4 md:py-0">
              <h4 className="text-gold-500 tracking-widest uppercase mb-3 text-sm font-semibold">100% Authenticity</h4>
              <p className="text-foreground/70 text-sm font-light">Every item is rigorously verified by our in-house experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="w-full py-24 px-6 md:px-12 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8">
            <div>
              <h2 className="text-sm text-gold-500 tracking-[0.3em] uppercase mb-4">Curated Selection</h2>
              <h3 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] text-foreground tracking-wide font-bold drop-shadow-sm">THE <span className="italic text-gold-500">HIGHLIGHTS</span></h3>
            </div>
            <Link
              href="/watches"
              className="mt-6 md:mt-0 text-foreground/70 hover:text-gold-500 uppercase tracking-widest text-xs flex items-center gap-2 transition-colors border-b border-transparent hover:border-gold-500 pb-1"
            >
              View All Collections
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                key={product.id}
                className="group flex flex-col perspective-1000"
              >
                <Link href={`/product/${product.id}`} className="relative h-[400px] w-full bg-panel overflow-hidden mb-6 block transform-gpu transition-transform duration-700 hover:scale-[1.03] shadow-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-gold-500 text-background px-6 py-3 uppercase tracking-widest text-xs font-semibold w-full hover:bg-foreground transition-colors"
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>

                <Link href={`/product/${product.id}`} className="text-center px-4 block">
                  <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2">{product.brand}</p>
                  <h4 className="text-lg text-foreground font-medium mb-2 group-hover:text-gold-500 transition-colors line-clamp-1">{product.name}</h4>
                  <p className="text-gold-500 font-serif text-lg tracking-wider">
                    {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(product.price)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Spotlight Section */}
      <section className="w-full bg-panel py-24">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Watches */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative h-[600px] w-full overflow-hidden group"
          >
            <Image src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200" alt="Watches" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background/20 group-hover:bg-background/50 transition-colors duration-500">
              <h3 className="text-3xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-foreground mb-4 tracking-widest drop-shadow-lg">FINE WATCHES</h3>
              <p className="text-foreground/80 font-light max-w-sm mb-8">Discover our exquisite collection of heritage timepieces.</p>
              <Link href="/watches" className="border border-gold-500 text-gold-500 px-8 py-3 uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-background transition-colors">
                Shop Watches
              </Link>
            </div>
          </motion.div>
          {/* Glasses */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative h-[600px] w-full overflow-hidden group"
          >
            <Image src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1200" alt="Glasses" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background/20 group-hover:bg-background/50 transition-colors duration-500">
              <h3 className="text-3xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-foreground mb-4 tracking-widest drop-shadow-lg">PREMIUM EYEWEAR</h3>
              <p className="text-foreground/80 font-light max-w-sm mb-8">Bold frames from the world's leading luxury houses.</p>
              <Link href="/glasses" className="border border-gold-500 text-gold-500 px-8 py-3 uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-background transition-colors">
                Shop Eyewear
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Split Section */}
      <section className="w-full flex flex-col lg:flex-row bg-background">
        <div className="lg:w-1/2 p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-sm text-gold-500 tracking-[0.3em] uppercase mb-6">Our Legacy</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] font-bold text-foreground tracking-wide leading-tight mb-8 drop-shadow-sm">
            DEFINING <br /><span className="italic text-gold-500">LUXURY</span> SINCE 1999
          </h3>
          <div className="space-y-6 text-foreground/70 font-light leading-relaxed max-w-xl">
            <p>
              Founded in Lahore, Zaman & Nazar has established itself as the premier destination for connoisseurs of fine watchmaking and distinctive eyewear in Pakistan.
            </p>
            <p>
              Our curated collection represents the pinnacle of craftsmanship, representing prestigious Maisons with an uncompromising commitment to authenticity, exclusivity, and personalized service.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-block mt-12 border border-border px-8 py-4 text-foreground uppercase tracking-widest text-xs hover:border-gold-500 hover:text-gold-500 transition-colors self-start"
          >
            Visit Our Boutiques
          </Link>
        </div>
        <div className="lg:w-1/2 relative h-[500px] lg:h-auto overflow-hidden">
          <Image
            src="/images/boutique_interior.png"
            alt="Luxury Store Interior"
            fill
            className="object-cover opacity-80"
          />
        </div>
      </section>
    </div>
  );
}
