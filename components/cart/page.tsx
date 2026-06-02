"use client";

import { useCart } from "@/components/cart/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-3xl font-light text-neutral-900">Handlekurven din er tom</h1>
        <p className="mt-4 text-neutral-600">Utforsk kolleksjonen vår for å finne dine favoritter.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Gå til shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-light text-neutral-900">Handlekurv</h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
        {/* Produktliste */}
        <div className="lg:col-span-7">
          <ul className="divide-y divide-neutral-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs">
                      Ingen bilde
                    </div>
                  )}
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-neutral-900">
                      <h3>{item.title}</h3>
                      <p className="ml-4">{(item.price * item.quantity).toLocaleString()} NOK</p>
                    </div>
                    <p className="mt-1 text-sm text-neutral-500">Antall: {item.quantity}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="rounded-md border border-neutral-300 px-2 py-1 hover:bg-neutral-50"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-md border border-neutral-300 px-2 py-1 hover:bg-neutral-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Fjern
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sammendrag */}
        <div className="mt-16 lg:col-span-5 lg:mt-0">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-neutral-900">Order Summary</h2>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-neutral-600">Subtotal</dt>
                <dd className="text-sm font-medium text-neutral-900">{total.toLocaleString()} NOK</dd>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                <dt className="text-base font-medium text-neutral-900">Total</dt>
                <dd className="text-base font-medium text-neutral-900">{total.toLocaleString()} NOK</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={() => alert("Checkout kommer snart!")}
                className="w-full rounded-md bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Gå til kassen (Kommer snart)
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link href="/shop" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                Fortsett shopping &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
