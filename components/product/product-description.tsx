import { AddToCart } from "./add-to-cart";
import { VariantSelector } from "./variant-selector";
import { useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  variants: { size: string; inStock: boolean }[];
}

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          {product.price} {product.currency}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm uppercase tracking-widest text-neutral-500">
          Størrelse
        </h3>
        <VariantSelector
          variants={product.variants}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />
      </div>

      {product.description && (
        <div className="mb-6 text-sm leading-tight dark:text-white/[60%]">
          <p>{product.description}</p>
        </div>
      )}

      <AddToCart
        product={{
          id: product.id,
          title: product.title,
          price: product.price,
          image: undefined,
        }}
      />
    </>
  );
}
