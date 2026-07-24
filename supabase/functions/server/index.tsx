// @ts-ignore - Deno imports are not recognized by the root React TS config
import { Hono } from "npm:hono";
// @ts-ignore
import { cors } from "npm:hono/cors";
// @ts-ignore
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Health check endpoint
app.get("/make-server-dd2dc34e/health", (c: any) => {
  return c.json({ status: "ok" });
});

// GET site content for public website
app.get("/make-server-dd2dc34e/content", async (c: any) => {
  try {
    const content = await kv.get("site_content");
    return c.json(content || {});
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// POST update site content from admin dashboard
app.post("/make-server-dd2dc34e/content", async (c: any) => {
  try {
    const body = await c.req.json();
    await kv.set("site_content", body);
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// GET games list
app.get("/make-server-dd2dc34e/games", async (c: any) => {
  try {
    const games = await kv.get("site_games");
    return c.json(games || []);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// POST update games list
app.post("/make-server-dd2dc34e/games", async (c: any) => {
  try {
    const body = await c.req.json();
    await kv.set("site_games", body);
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// @ts-ignore - Deno global is not recognized by the root React TS config
Deno.serve(app.fetch);