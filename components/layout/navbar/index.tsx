'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Search from './search';
import Cart from './cart';
import OpenCart from './cart/open-cart';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  const [isSolid, setIsSolid] = useState(false);
  const pathname = usePathname();

  // الصفحات الملكية (شفاف في البداية)
  const isSpecialPage = pathname === '/shop' || pathname === '/search' || pathname.startsWith('/category') || pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // يتحول لصلب بعد 500 بيكسل
      if (window.scrollY > 500) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isSpecialPage && !isSolid;
  const navStyles = isTransparent 
    ? "bg-transparent text-white border-transparent" 
    : "bg-white text-black shadow-md border-b border-gray-100";

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${navStyles}`}>
      <div className="mx-auto flex h-20 items-center justify-between px-4 lg:px-12">
        
        {/* اليسار: الرجوع والمنيو */}
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="hover:scale-110 transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={[]} /> 
            </Suspense>
          </div>
        </div>

        {/* المنتصف: اللوجو */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="Buylnk" 
              className={`h-10 w-auto transition-all ${isTransparent ? 'brightness-0 invert' : ''}`} 
            />
          </Link>
        </div>

        {/* اليمين: البحث والسلة والحساب */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden md:block w-64">
            <Suspense fallback={null}>
              <Search />
            </Suspense>
          </div>
          <Link href="/account" className="hidden md:block hover:text-blue-600 transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 7a4 4 0 110-8 4 4 0 010 8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>

      </div>
    </nav>
  );
}
