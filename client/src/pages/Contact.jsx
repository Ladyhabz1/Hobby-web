import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setData(null);
        setIsSubmitting(true);

        try {
          const result = await apiFetch("/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setData(result);
            setFormData({ name: "", email: "", message: "" });
        }
        catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Failed to send contact request.");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (<main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="mx-auto max-w-3xl rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)] sm:p-8">
        <p className="font-sans text-xs uppercase tracking-[0.28em] text-primary/70">Contact</p>
        <h1 className="mt-3 font-serif text-4xl text-slate-900">Send a Message</h1>
        <p className="mt-3 font-sans leading-7 text-slate-700">
          This form already sends a JSON payload to the future API endpoint.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="font-sans text-sm text-slate-700">Name</span>
            <input type="text" required value={formData.name} onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-cyan-200 transition focus:ring"/>
          </label>

          <label className="block">
            <span className="font-sans text-sm text-slate-700">Email</span>
            <input type="email" required value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-cyan-200 transition focus:ring"/>
          </label>

          <label className="block">
            <span className="font-sans text-sm text-slate-700">Message</span>
            <textarea required rows={5} value={formData.message} onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-cyan-200 transition focus:ring"/>
          </label>

          <button type="submit" disabled={isSubmitting} className="rounded-full bg-slate-900 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.14em] text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Sending..." : "Send to /api/contact"}
          </button>

          {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</p> : null}
          {data ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">Message request submitted.</p> : null}
        </form>
      </section>
    </main>);
}