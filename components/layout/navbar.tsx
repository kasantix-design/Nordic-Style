"use client";

import Link from "next/link";
import { useCart } from "../cart/cart-context";
import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900">
          Nordic Style
        </Link>
        
    <div className="relative group">
       <button className="text-sm font-medium text-neutral-900 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300">
        Online Shop
       </button>
       {/* Dropdown meny som vises ved hover */}
  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
    <div className="py-1">
      <Link href="/shop?category=jakker" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
        Jakker
      </Link>
      <Link href="/shop?category=skjort" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
        Skjørt
      </Link>
      <Link href="/shop?category=bluser" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
        Bluser
      </Link>
      <Link href="/shop?category=tilbehør" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
        Tilbehør
      </Link>
      <div className="border-t border-neutral-100 my-1"></div>
      <Link href="/shop" className="block px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100">
        Se alle produkter
      </Link>
    </div>
  </div>
</div>
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
