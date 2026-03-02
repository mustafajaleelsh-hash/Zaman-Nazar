import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { AddToCartButton } from "@/components/AddToCartButton";
import { HotDealsSidebar } from "@/components/HotDealsSidebar";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = (productsData as Product[]).find(p => p.id === id);
    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pt-12 pb-24 px-6 md:px-12">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Sidebar - Left Side (Hot Deals) */}
                    <div className="w-full lg:w-1/4 hidden lg:block">
                        <HotDealsSidebar />
                    </div>

                    {/* Main Content - Right Side */}
                    <div className="w-full lg:w-3/4 flex flex-col md:flex-row gap-12">

                        {/* Image Gallery */}
                        <div className="w-full md:w-1/2 flex flex-col gap-6">
                            <div className="relative aspect-[3/4] w-full bg-panel overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative aspect-[3/4] bg-panel border border-foreground/5 opacity-60 hover:opacity-100 transition-opacity">
                                    <Image src={product.image} alt="Detail" fill sizes="25vw" className="object-cover" />
                                </div>
                                <div className="relative aspect-[3/4] bg-panel border border-foreground/5 opacity-60 hover:opacity-100 transition-opacity">
                                    <Image src={product.image} alt="Detail" fill sizes="25vw" className="object-cover" />
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full md:w-1/2 flex flex-col">
                            <p className="text-sm uppercase tracking-[0.3em] text-foreground/50 mb-4">{product.brand}</p>
                            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">{product.name}</h1>
                            <p className="text-gold-500 font-serif text-3xl tracking-wider mb-8 pb-8 border-b border-border">
                                {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(product.price)}
                            </p>

                            <div className="text-foreground/80 font-light leading-relaxed mb-10 text-sm">
                                <p>{product.description}</p>
                            </div>

                            {/* Material Details / Specs */}
                            <div className="mb-12">
                                <h3 className="text-xs tracking-widest uppercase text-foreground mb-6">Specifications</h3>
                                <ul className="space-y-4">
                                    {product.category === "watches" && product.movement && (
                                        <li className="flex justify-between border-b border-foreground/5 pb-2 text-sm">
                                            <span className="text-foreground/50">Movement</span>
                                            <span className="text-foreground text-right">{product.movement}</span>
                                        </li>
                                    )}
                                    {product.category === "glasses" && product.material && (
                                        <li className="flex justify-between border-b border-foreground/5 pb-2 text-sm">
                                            <span className="text-foreground/50">Frame Material</span>
                                            <span className="text-foreground text-right">{product.material}</span>
                                        </li>
                                    )}
                                    {product.features.map((feature, idx) => (
                                        <li key={`feat-${idx}`} className="flex justify-between border-b border-foreground/5 pb-2 text-sm">
                                            <span className="text-foreground/50">Feature {idx + 1}</span>
                                            <span className="text-foreground text-right">{feature}</span>
                                        </li>
                                    ))}
                                    <li className="flex justify-between border-b border-foreground/5 pb-2 text-sm pt-4">
                                        <span className="text-gold-500 uppercase tracking-widest font-semibold flex items-center">
                                            ✓ Free Insured Shipping (Pakistan)
                                        </span>
                                    </li>
                                    <li className="flex justify-between border-b border-foreground/5 pb-2 text-sm">
                                        <span className="text-gold-500 uppercase tracking-widest font-semibold flex items-center">
                                            ✓ 2-Year International Warranty
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Actions: Add To Cart & WhatsApp Inquire */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <AddToCartButton product={product} className="bg-gold-500 text-background px-8 py-5 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-foreground hover:text-background transition-all duration-300 transform w-full sm:w-1/2 flex items-center justify-center text-center" />

                                <a
                                    href={`https://wa.me/923108658590?text=Hello%20Zaman%20%26%20Nazar!%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.brand)}).%20Please%20provide%20more%20details.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-[#25D366] text-[#25D366] px-8 py-5 uppercase tracking-[0.2em] text-[10px] md:text-sm font-semibold hover:bg-[#25D366] hover:text-foreground transition-all duration-300 transform w-full sm:w-1/2 flex items-center justify-center gap-3 text-center"
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                    </svg>
                                    WhatsApp Info
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
