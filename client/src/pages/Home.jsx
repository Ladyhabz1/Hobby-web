/*
Design philosophy for this page: Tidal Editorial.
This page should feel like a personal aquatic journal with asymmetric layouts,
quiet luxury, elongated lane-inspired dividers, and calm motion.
Every section should reinforce serenity, discipline, and the reflective side of swimming.
*/
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Waves, TimerReset, HeartPulse, MapPinned, ChevronRight } from "lucide-react";
const weeklySessions = [
    {
        day: "Monday",
        focus: "Technique and breathing",
        detail: "I begin the week with gentle drills, long glides, and breathing patterns that help me reset after busy days.",
    },
    {
        day: "Wednesday",
        focus: "Steady endurance",
        detail: "Midweek swims are about rhythm. I settle into longer sets and let the repetition clear my mind.",
    },
    {
        day: "Saturday",
        focus: "Open-water or relaxed pool swim",
        detail: "Weekend sessions feel more reflective. I swim for enjoyment, scenery, and the sense of freedom water gives me.",
    },
];
const highlights = [
    {
        icon: Waves,
        title: "Why I love it",
        text: "Swimming gives me a rare combination of calm focus and full-body movement. It feels restorative and energizing at the same time.",
    },
    {
        icon: TimerReset,
        title: "What it teaches me",
        text: "The pool rewards consistency. Small improvements in timing, breathing, and posture build confidence over time.",
    },
    {
        icon: HeartPulse,
        title: "How it helps me",
        text: "It improves my stamina, reduces stress, and creates a quiet space where I can think clearly and move with intention.",
    },
];
const moments = [
    "The first dive into cool water early in the morning.",
    "The steady sound of bubbles during a long underwater glide.",
    "That peaceful feeling after a strong set is finished.",
    "Watching light move across the pool floor between laps.",
];
export default function Home() {
    const [activeDay, setActiveDay] = useState(weeklySessions[0].day);
    const selectedSession = useMemo(() => weeklySessions.find((session) => session.day === activeDay) ?? weeklySessions[0], [activeDay]);
    return (<div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(140,214,229,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(8,68,100,0.12),transparent_28%)]"/>

      <main className="relative">
        <section className="px-4 pb-14 pt-4 sm:px-6 lg:px-8 lg:pb-20 lg:pt-6">
          <div className="mx-auto grid min-h-[88vh] max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-6 text-slate-50 shadow-[0_30px_80px_rgba(6,28,45,0.30)] sm:px-8 sm:py-8 lg:min-h-[760px] lg:px-10 lg:py-10" style={{
            backgroundImage: "linear-gradient(120deg, rgba(2, 18, 31, 0.88) 0%, rgba(2, 18, 31, 0.72) 32%, rgba(2, 18, 31, 0.18) 68%), url('https://d2xsxph8kpxj0f.cloudfront.net/310519663529357470/7Bmq8HPxuRfPQ7icdtG57o/swimming-hero-lanes-clean-AMEuapzF2xYpQtdEdWmM6Z.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-sans text-[0.72rem] uppercase tracking-[0.34em] text-cyan-100/80">
                    Personal Hobby Site
                  </p>
                  <div className="mt-3 h-px w-24 bg-gradient-to-r from-cyan-100/70 to-transparent"/>
                </div>
                <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="font-sans text-xs uppercase tracking-[0.28em] text-cyan-50/85">
                    Swimming
                  </span>
                </div>
              </div>

              <div className="max-w-xl">
                <p className="mb-4 font-sans text-sm uppercase tracking-[0.34em] text-cyan-100/75">
                  Chosen design: Tidal Editorial
                </p>
                <h1 className="max-w-lg font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                  Swimming is where I find rhythm, focus, and calm.
                </h1>
                <p className="mt-6 max-w-md font-sans text-base leading-7 text-slate-200/88 sm:text-lg">
                  This website is a small portrait of my favorite hobby, from quiet pool sessions to reflective dawn swims.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#routine" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-sans text-sm font-semibold tracking-[0.16em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-50">
                    Explore My Routine
                    <ChevronRight className="h-4 w-4"/>
                  </a>
                  <a href="#story" className="inline-flex items-center rounded-full border border-white/25 px-5 py-3 font-sans text-sm font-medium tracking-[0.12em] text-white/90 backdrop-blur-sm transition duration-300 hover:border-white/45 hover:bg-white/10">
                    Why It Matters
                  </a>
                </div>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                {[
            ["3", "swim sessions most weeks"],
            ["1", "hobby that helps me fully switch off"],
            ["∞", "reasons to keep coming back to the water"],
        ].map(([value, label]) => (<div key={label}>
                    <p className="font-serif text-3xl text-white">{value}</p>
                    <p className="mt-2 max-w-[14rem] font-sans text-sm leading-6 text-slate-200/75">{label}</p>
                  </div>))}
              </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-rows-[0.95fr_1.05fr]">
              <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }} id="story" className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)] backdrop-blur-sm sm:p-8">
                <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.6), rgba(255,255,255,0.15)), url('https://d2xsxph8kpxj0f.cloudfront.net/310519663529357470/7Bmq8HPxuRfPQ7icdtG57o/swimming-water-texture-abstract-clean-PzMc4fUEgssSw2aADHQE8v.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}/>
                <div className="relative">
                  <p className="font-sans text-xs uppercase tracking-[0.34em] text-primary/70">About the hobby</p>
                  <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight text-slate-900">
                    For me, swimming is both exercise and a form of mental reset.
                  </h2>
                  <p className="mt-5 max-w-xl font-sans text-base leading-7 text-slate-700">
                    I enjoy the structure of pool swimming, the repetitive calm of steady laps, and the way the water creates distance from noise, screens, and daily pressure.
                  </p>
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.18, ease: "easeOut" }} className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,58,85,0.08)]">
                <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="min-h-[250px] bg-cover bg-center" style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663529357470/7Bmq8HPxuRfPQ7icdtG57o/swimming-poolside-editorial-final-JwCuAmqZaNsTEW7mtiW3Wt.webp')",
        }}/>
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.34em] text-primary/70">Poolside ritual</p>
                      <h3 className="mt-3 font-serif text-3xl text-slate-900">Preparation is part of the enjoyment.</h3>
                      <p className="mt-4 font-sans text-base leading-7 text-slate-700">
                        There is something grounding about packing goggles, a cap, a towel, and water before a session. The routine makes the swim feel intentional.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                      <div className="h-[2px] w-16 bg-gradient-to-r from-cyan-500 to-transparent"/>
                      <span className="font-sans text-sm tracking-[0.15em] text-slate-500 uppercase">
                        Calm before the first lap
                      </span>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)] sm:p-8">
              <p className="font-sans text-xs uppercase tracking-[0.34em] text-primary/70">What keeps me coming back</p>
              <div className="mt-8 space-y-6">
                {highlights.map((item) => {
            const Icon = item.icon;
            return (<div key={item.title} className="flex gap-4 border-b border-slate-200/80 pb-6 last:border-b-0 last:pb-0">
                      <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-800">
                        <Icon className="h-5 w-5"/>
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-slate-900">{item.title}</h3>
                        <p className="mt-2 font-sans text-base leading-7 text-slate-700">{item.text}</p>
                      </div>
                    </div>);
        })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-6 text-slate-50 shadow-[0_28px_70px_rgba(8,38,58,0.24)] sm:p-8 lg:p-10" style={{
            backgroundImage: "linear-gradient(145deg, rgba(5,26,40,0.78), rgba(10,54,78,0.36)), url('https://d2xsxph8kpxj0f.cloudfront.net/310519663529357470/7Bmq8HPxuRfPQ7icdtG57o/swimming-openwater-dawn-final-WeAjYXMjwNw7mVLzumQ6sq.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
              <p className="font-sans text-xs uppercase tracking-[0.34em] text-cyan-100/80">Favorite feeling</p>
              <blockquote className="mt-8 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl">
                “The best part of swimming is the moment when the world gets quieter and every movement becomes deliberate.”
              </blockquote>
              <div className="mt-10 max-w-lg border-t border-white/15 pt-6">
                <p className="font-sans text-base leading-7 text-slate-100/82">
                  Whether it is a structured session in the pool or a slow open-water swim at sunrise, water gives me space to breathe, concentrate, and feel present.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="routine" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,58,85,0.08)]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="border-b border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <p className="font-sans text-xs uppercase tracking-[0.34em] text-primary/70">My week in the water</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-slate-900">A simple swimming routine that keeps me balanced.</h2>
                <p className="mt-4 max-w-md font-sans text-base leading-7 text-slate-700">
                  I do not treat every session the same. Some swims are about technique, some are about endurance, and some are simply about enjoying the water.
                </p>
                <div className="mt-8 space-y-3">
                  {weeklySessions.map((session) => {
            const isActive = session.day === activeDay;
            return (<button key={session.day} type="button" onClick={() => setActiveDay(session.day)} className={`w-full rounded-2xl border px-4 py-4 text-left transition duration-300 ${isActive
                    ? "border-cyan-300 bg-white shadow-[0_16px_35px_rgba(15,58,85,0.10)]"
                    : "border-transparent bg-white/70 hover:border-cyan-200 hover:bg-white"}`}>
                        <span className="block font-sans text-xs uppercase tracking-[0.28em] text-slate-500">
                          {session.day}
                        </span>
                        <span className="mt-2 block font-serif text-2xl text-slate-900">{session.focus}</span>
                      </button>);
        })}
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <motion.div key={selectedSession.day} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="h-full rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(247,252,254,0.95),rgba(232,246,250,0.92))] p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.34em] text-primary/70">Selected session</p>
                      <h3 className="mt-3 font-serif text-4xl text-slate-900">{selectedSession.day}</h3>
                    </div>
                    <div className="rounded-full bg-white px-4 py-2 shadow-sm">
                      <span className="font-sans text-sm tracking-[0.16em] uppercase text-slate-600">Swim plan</span>
                    </div>
                  </div>

                  <h4 className="mt-8 font-serif text-3xl text-slate-900">{selectedSession.focus}</h4>
                  <p className="mt-4 max-w-2xl font-sans text-lg leading-8 text-slate-700">{selectedSession.detail}</p>

                  <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {[
            ["Warm up", "Easy laps and mobility"],
            ["Main focus", selectedSession.focus],
            ["Finish", "Slow recovery and stretch"],
        ].map(([label, value]) => (<div key={label} className="rounded-2xl border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-sm">
                        <p className="font-sans text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
                        <p className="mt-3 font-serif text-2xl leading-tight text-slate-900">{value}</p>
                      </div>))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)] sm:p-8">
              <p className="font-sans text-xs uppercase tracking-[0.34em] text-primary/70">Small details I enjoy</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-slate-900">Swimming is made up of little moments that stay with me.</h2>
              <div className="mt-8 grid gap-4">
                {moments.map((moment, index) => (<div key={moment} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="font-sans text-base leading-7 text-slate-700">{moment}</p>
                  </div>))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,58,85,0.08)]">
              <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
                <div className="min-h-[320px] bg-cover bg-center" style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663529357470/7Bmq8HPxuRfPQ7icdtG57o/swimming-openwater-dawn-final-WeAjYXMjwNw7mVLzumQ6sq.webp')",
        }}/>
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center gap-3">
                      <MapPinned className="h-5 w-5 text-cyan-700"/>
                      <p className="font-sans text-xs uppercase tracking-[0.34em] text-primary/70">Personal takeaway</p>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl text-slate-900">Swimming helps me feel stronger and more present.</h3>
                    <p className="mt-4 font-sans text-base leading-7 text-slate-700">
                      It is a hobby I can return to in different moods and seasons. Some days it feels athletic, and on others it feels almost meditative. That versatility is exactly why I value it.
                    </p>
                  </div>
                  <div className="mt-8 border-t border-slate-200 pt-5">
                    <p className="font-sans text-sm uppercase tracking-[0.15em] text-slate-500">
                      Built as a personal hobby webpage with HTML, CSS, and JavaScript structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>);
}
