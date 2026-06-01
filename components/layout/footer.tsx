import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:gap-12 md:px-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-neutral-900 dark:text-white">
            {/* Placeholder for logo - erstatt med SVG eller bilde senere */}
            <span className="text-xl font-bold tracking-tight">NS</span>
            <span className="font-medium uppercase">Nordic Style</span>
          </Link>
        </div>
        
        <div className="md:ml-auto">
          <p className="mb-2 font-medium text-neutral-900 dark:text-white">Meny</p>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-neutral-900 dark:hover:text-white">Hjem</Link></li>
            <li><Link href="/journal" className="hover:text-neutral-900 dark:hover:text-white">Journal</Link></li>
            <li><Link href="/about" className="hover:text-neutral-900 dark:hover:text-white">Om oss</Link></li>
          </ul>
        </div>

        <div className="md:ml-auto">
          <p className="mb-2 font-medium text-neutral-900 dark:text-white">Kontakt</p>
          <ul className="space-y-2">
            <li><a href="mailto:info@nordicstyle.no" className="hover:text-neutral-900 dark:hover:text-white">info@nordicstyle.no</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-6 text-center text-xs dark:border-neutral-800">
        <p>&copy; {currentYear} Nordic Style. All rights reserved.</p>
      </div>
    </footer>
  );
}
