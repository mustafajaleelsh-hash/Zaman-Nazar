import React from "react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";

export default function WatchesPage() {
    const watches = (productsData as Product[]).filter(p => p.category === "watches");

    return (
        <ProductGrid
            title="Luxury Watches"
            description="Discover our exclusive selection of the world's finest timepieces. From storied heritage to avant-garde complications, explore engineering excellence and impeccable design."
            products={watches}
            category="watches"
        />
    );
}
