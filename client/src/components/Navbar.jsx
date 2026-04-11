import { Link, useLocation } from "wouter";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [location] = useLocation();
    return (<header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-2xl tracking-tight text-slate-900">
          Swim Journal
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (<Link key={item.href} href={item.href} className={`rounded-full px-3 py-2 font-sans text-xs uppercase tracking-[0.12em] transition sm:px-4 ${isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`}>
                {item.label}
              </Link>);
        })}
        </nav>
      </div>
    </header>);
}