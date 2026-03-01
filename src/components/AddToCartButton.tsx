"use client";

import React from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export const AddToCartButton = ({ product, className, children }: { product: Product, className?: string, children?: React.ReactNode }) => {
    const { addToCart } = useCart();

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
            }}
            className={className || "bg-gold-500 text-black px-6 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white transition-colors"}
        >
            {children || "Add To Cart"}
        </button>
    );
};
