import React from "react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";

export default function GlassesPage() {
    const glasses = (productsData as Product[]).filter(p => p.category === "glasses");

    return (
        <ProductGrid
            title="Premium Eyewear"
            description="Elevate your vision with our curated collection of designer eyewear. Masterful craftsmanship meets bold aesthetics in every frame."
            products={glasses}
            category="glasses"
        />
    );
}
