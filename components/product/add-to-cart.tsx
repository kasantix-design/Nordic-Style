"use client";

import { useState } from "react";
import { useCart } from "../cart/cart-context";

interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
}

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addItem(product);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full rounded-md bg-neutral-900 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {isLoading ? "Legger til..." : "Legg i handlekurv"}
      </button>
    </div>
  );
}