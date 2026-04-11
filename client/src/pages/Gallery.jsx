import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const fallbackImages = [
    {
        id: "img-1",
        title: "Morning Lanes",
        url: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "img-2",
        title: "Pool Surface",
        url: "https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "img-3",
        title: "Open Water",
        url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
    },
];

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        const loadGallery = async () => {
            setIsLoading(true);
            setError("");
            try {
                const data = await apiFetch("/gallery");
                if (mounted) {
                    const nextImages = Array.isArray(data?.images) ? data.images : [];
                    setImages(nextImages.length ? nextImages : fallbackImages);
                }
            }
            catch (requestError) {
                if (mounted) {
                    setError(requestError instanceof Error ? requestError.message : "Unknown error while loading gallery.");
                    setImages(fallbackImages);
                }
            }
            finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadGallery();
        return () => {
            mounted = false;
        };
    }, []);

    return (<main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="mx-auto max-w-7xl rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-[0_18px_50px_rgba(15,58,85,0.08)] sm:p-8">
        <p className="font-sans text-xs uppercase tracking-[0.28em] text-primary/70">Gallery</p>
        <h1 className="mt-3 font-serif text-4xl text-slate-900">Swimming Moments</h1>

        {isLoading ? <p className="mt-6 text-slate-600">Loading gallery...</p> : null}
        {!isLoading && error ? <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">{error}</p> : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (<figure key={image.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img src={image.url} alt={image.title} className="h-56 w-full object-cover" loading="lazy"/>
              <figcaption className="px-4 py-3 font-sans text-sm text-slate-700">{image.title}</figcaption>
            </figure>))}
        </div>
      </section>
    </main>);
}