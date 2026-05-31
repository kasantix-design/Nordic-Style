"use client";

interface Variant {
  size: string;
  inStock: boolean;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export function VariantSelector({
  variants,
  selectedSize,
  onSelectSize,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <button
          key={variant.size}
          onClick={() => variant.inStock && onSelectSize(variant.size)}
          disabled={!variant.inStock}
          className={`h-12 w-16 border text-sm font-medium transition-colors
            ${
              selectedSize === variant.size
                ? "border-neutral-900 bg-neutral-900 text-white"
                : variant.inStock
                ? "border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
                : "border-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
        >
          {variant.size}
        </button>
      ))}
    </div>
  );
}
