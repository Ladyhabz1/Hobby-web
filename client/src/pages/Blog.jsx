import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const fallbackPosts = [
    {
        id: "local-1",
        title: "Breathing Rhythm Update",
        summary: "Worked on bilateral breathing and smoother turns this week.",
    },
    {
        id: "local-2",
        title: "Open Water Notes",
        summary: "Focused on calm pacing and sighting drills in low morning light.",
    },
];

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({ title: "", summary: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        let mounted = true;
        const loadPosts = async () => {
            setIsLoading(true);
            setError("");
            try {
                const data = await apiFetch("/blog");
                if (mounted) {
                    const nextPosts = Array.isArray(data?.posts) ? data.posts : [];
                    setPosts(nextPosts.length ? nextPosts : fallbackPosts);
                }
            }
            catch (requestError) {
                if (mounted) {
                    setError(requestError instanceof Error ? requestError.message : "Unknown error while loading blog posts.");
                    setPosts(fallbackPosts);
                }
            }
            finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadPosts();
        return () => {
            mounted = false;
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError("");
        setSubmitMessage("");
        setIsSubmitting(true);

        try {
            const result = await apiFetch("/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const createdPost = {
                id: result?.id ?? crypto.randomUUID(),
                title: formData.title,
                summary: formData.summary,
            };

            setPosts((prev) => [createdPost, ...prev]);
            setFormData({ title: "", summary: "" });
            setSubmitMessage("Post request sent successfully.");
        }
        catch (requestError) {
            setSubmitError(requestError instanceof Error ? requestError.message : "Failed to submit blog post.");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (<main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)] sm:p-8">
          <p className="font-sans text-xs uppercase tracking-[0.28em] text-primary/70">Blog</p>
          <h1 className="mt-3 font-serif text-4xl text-slate-900">Swim Journal Entries</h1>

          {isLoading ? <p className="mt-6 text-slate-600">Loading blog posts...</p> : null}
          {!isLoading && error ? <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">{error}</p> : null}

          <div className="mt-6 space-y-4">
            {posts.map((post) => (<article key={post.id} className="rounded-2xl border border-slate-200 bg-white/80 p-5">
                <h2 className="font-serif text-2xl text-slate-900">{post.title}</h2>
                <p className="mt-2 font-sans leading-7 text-slate-700">{post.summary}</p>
              </article>))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)] sm:p-8">
          <p className="font-sans text-xs uppercase tracking-[0.28em] text-primary/70">Create Post</p>
          <h2 className="mt-3 font-serif text-3xl text-slate-900">Blog Post Form</h2>
          <p className="mt-2 text-slate-600">This sends JSON to an API route now, even before admin/backend is fully connected.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="font-sans text-sm text-slate-700">Title</span>
              <input type="text" required value={formData.title} onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-cyan-200 transition focus:ring"/>
            </label>

            <label className="block">
              <span className="font-sans text-sm text-slate-700">Summary</span>
              <textarea required rows={4} value={formData.summary} onChange={(event) => setFormData((prev) => ({ ...prev, summary: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-cyan-200 transition focus:ring"/>
            </label>

            <button type="submit" disabled={isSubmitting} className="rounded-full bg-slate-900 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.14em] text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Sending..." : "Send to /api/blog"}
            </button>

            {submitError ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{submitError}</p> : null}
            {submitMessage ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">{submitMessage}</p> : null}
          </form>
        </section>
      </div>
    </main>);
}