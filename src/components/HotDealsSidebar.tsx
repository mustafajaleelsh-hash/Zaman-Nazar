import React from "react";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export const HotDealsSidebar = () => {
    // Let's pick 3 random/featured products for Hot Deals
    const hotDeals = (productsData as Product[]).filter(p => ["w5", "g6", "w8"].includes(p.id));

    return (
        <div className="bg-[#050505] border border-border p-6 flex flex-col gap-8 sticky top-32">
            <h3 className="text-xl font-serif tracking-widest text-gold-500 uppercase border-b border-border pb-4">
                Hot Deals
            </h3>

            <div className="flex flex-col gap-6 w-full">
                {hotDeals.map((deal) => (
                    <Link href={`/product/${deal.id}`} key={deal.id} className="group flex flex-col gap-4">
                        <div className="relative h-[250px] w-full bg-panel overflow-hidden">
                            <Image
                                src={deal.image}
                                alt={deal.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute top-2 left-2 bg-red-600/80 text-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-wider backdrop-blur-sm">
                                Limited Offer
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-1">{deal.brand}</p>
                            <h4 className="text-sm text-foreground font-medium mb-1 group-hover:text-gold-500 transition-colors line-clamp-1">{deal.name}</h4>
                            <p className="text-gold-500 font-serif text-sm tracking-wider">
                                {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(deal.price)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
