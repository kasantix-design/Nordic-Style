"use client";

import { useCart } from "./cart-context";

interface AddToCartProps {
  product: {
    id: string;
    title: string;
    price: number;
    image?: string;
  };
}

export function AddToCart({ product }: AddToCartProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    // Enkel melding (i fremtiden kan vi bruke toast)
    alert("Produkt lagt i handlekurv!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-neutral-900 py-4 text-sm uppercase tracking-widest text-white transition-colors hover:bg-neutral-700"
    >
      Legg i handlekurv
    </button>
  );
}
