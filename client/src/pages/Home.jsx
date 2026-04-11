import { motion } from "framer-motion";
import { Link } from "wouter";

const pageCards = [
    {
        title: "Blog",
        description: "Track swim sessions, techniques, and progress updates.",
        href: "/blog",
    },
    {
        title: "Gallery",
        description: "Show pool moments, open-water views, and favorite shots.",
        href: "/gallery",
    },
    {
        title: "Contact",
        description: "Use a ready-to-connect contact form for future backend integration.",
        href: "/contact",
    },
];

export default function Home() {
    return (<main className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(140,214,229,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(8,68,100,0.12),transparent_28%)]"/>

      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-8 text-slate-50 shadow-[0_30px_80px_rgba(6,28,45,0.30)] sm:px-8 lg:px-10 lg:py-12" style={{
            backgroundImage: "linear-gradient(120deg, rgba(2, 18, 31, 0.88) 0%, rgba(2, 18, 31, 0.72) 32%, rgba(2, 18, 31, 0.18) 68%), url('https://d2xsxph8kpxj0f.cloudfront.net/310519663529357470/7Bmq8HPxuRfPQ7icdtG57o/swimming-hero-lanes-clean-AMEuapzF2xYpQtdEdWmM6Z.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.34em] text-cyan-100/80">
            Personal Hobby Site
          </p>
          <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Swimming is where I reset, refocus, and grow.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-slate-200/88 sm:text-lg">
            The site now has dedicated pages for blog content, gallery items, and contact submissions so API integration can scale cleanly.
          </p>
        </motion.div>
      </section>

      <section className="relative mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-3">
        {pageCards.map((card, index) => (<motion.article key={card.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }} className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)]">
            <h2 className="font-serif text-3xl text-slate-900">{card.title}</h2>
            <p className="mt-3 font-sans text-base leading-7 text-slate-700">{card.description}</p>
            <Link href={card.href} className="mt-6 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 font-sans text-sm uppercase tracking-[0.14em] text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-900">
              Open Page
            </Link>
          </motion.article>))}
      </section>
    </main>);
}
