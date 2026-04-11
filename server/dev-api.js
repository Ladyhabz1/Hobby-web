import express from "express";
import { randomUUID } from "crypto";

const app = express();
const port = Number(process.env.DEV_API_PORT || 4000);

app.use(express.json({ limit: "1mb" }));

const blogPosts = [
    {
        id: "1",
        title: "Breathing Rhythm Update",
        summary: "Worked on bilateral breathing and smoother turns this week.",
    },
    {
        id: "2",
        title: "Open Water Notes",
        summary: "Focused on calm pacing and sighting drills in low morning light.",
    },
];

const galleryImages = [
    {
        id: "1",
        title: "Morning Lanes",
        url: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "2",
        title: "Pool Surface",
        url: "https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "3",
        title: "Open Water",
        url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
    },
];

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/blog", (_req, res) => {
    res.json({ posts: blogPosts });
});

app.post("/api/blog", (req, res) => {
    const title = typeof req.body?.title === "string" ? req.body.title.trim() : "";
    const summary = typeof req.body?.summary === "string" ? req.body.summary.trim() : "";

    if (!title || !summary) {
        return res.status(422).json({ message: "Title and summary are required." });
    }

    const created = {
        id: randomUUID(),
        title,
        summary,
    };

    blogPosts.unshift(created);
    return res.status(201).json({ id: created.id, message: "created" });
});

app.get("/api/gallery", (_req, res) => {
    res.json({ images: galleryImages });
});

app.post("/api/contact", (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

    if (!name || !email || !message) {
        return res.status(422).json({ message: "Name, email, and message are required." });
    }

    const ticket = `CT-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    return res.status(201).json({ message: "received", ticket });
});

app.get("/sanctum/csrf-cookie", (_req, res) => {
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Dev API running at http://localhost:${port}`);
});
