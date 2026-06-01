import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: {
    default: "Nordic Style",
    template: "%s | Nordic Style",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Tom handlekurv inntil vi kobler til Supabase i Bolk 2
  const cartPromise = Promise.resolve(null);

  return (
    <html lang="no" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cartPromise}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            {/* <WelcomeToast /> er fjernet siden filen er slettet */}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
