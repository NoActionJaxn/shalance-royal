import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/events", "routes/events.tsx"),
  route("/matches", "routes/matches.tsx"),
  route("/matches/:slug", "routes/matches.$slug.tsx"),
  route("/gallery", "routes/gallery.tsx"),
] satisfies RouteConfig;
