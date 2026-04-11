import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function startServer() {
    const app = express();
    const server = createServer(app);
    const apiUpstreamUrl = process.env.API_UPSTREAM_URL?.replace(/\/+$/, "");

    app.use(express.json({ limit: "1mb" }));

    app.get("/api/health", (_req, res) => {
        res.json({ status: "ok" });
    });

    if (apiUpstreamUrl) {
        app.use("/api", async (req, res, next) => {
            if (req.path === "/health") {
                return next();
            }

            try {
                const upstreamUrl = `${apiUpstreamUrl}${req.originalUrl}`;
                const hasBody = !["GET", "HEAD"].includes(req.method);
                const upstreamResponse = await fetch(upstreamUrl, {
                    method: req.method,
                    headers: {
                        accept: req.headers.accept || "application/json",
                        ...(req.headers["content-type"]
                            ? { "content-type": req.headers["content-type"] }
                            : {}),
                        ...(req.headers.cookie ? { cookie: req.headers.cookie } : {}),
                    },
                    body: hasBody ? JSON.stringify(req.body ?? {}) : undefined,
                });

                const responseText = await upstreamResponse.text();
                const upstreamContentType = upstreamResponse.headers.get("content-type");
                if (upstreamContentType) {
                    res.setHeader("content-type", upstreamContentType);
                }

                res.status(upstreamResponse.status).send(responseText);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "API upstream unavailable.";
                res.status(502).json({ message });
            }
        });
    }
    else {
        app.all("/api/*", (_req, res) => {
            res.status(503).json({
                message: "API backend is not configured. Set API_UPSTREAM_URL to your PHP backend.",
            });
        });
    }

    // Serve static files from dist/public in production
    const staticPath = process.env.NODE_ENV === "production"
        ? path.resolve(__dirname, "public")
        : path.resolve(__dirname, "..", "dist", "public");
    app.use(express.static(staticPath));
    // Handle client-side routing - serve index.html for all routes
    app.get("*", (_req, res) => {
        res.sendFile(path.join(staticPath, "index.html"));
    });
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/`);
    });
}
startServer().catch(console.error);
