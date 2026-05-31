"use client";

import Link from "next/link";
import { useCart } from "../cart/cart-context";

export function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900">
          Nordic Style
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/journal" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
            Journal
          </Link>
          
          <Link href="/cart" className="relative text-sm font-medium text-neutral-700 hover:text-neutral-900">
            Handlekurv
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
