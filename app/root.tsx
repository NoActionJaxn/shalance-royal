import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import PageContainer from "./components/PageContainer";
import { Header } from "./components/Header";
import React from "react";
import MobileMenu from "./components/MobileMenu";
import useOnResize from "./hooks/useOnResize";
import { Footer } from "./components/Footer";
import type { CallToAction } from "./types/cta";

const MENU: CallToAction[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const SOCIALS: CallToAction[] = [
  { 
    label: "Twitter", 
    path: "https://twitter.com/shalance_royal",
    icon: {
      prefix: "fab",
      iconName: "fa-twitter"
    }
  },
  { 
    label: "Instagram",
    path: "https://instagram.com/shalance_royal",
    icon: {
      prefix: "fab",
      iconName: "fa-instagram"
    }
  },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  }

  const handleCloseMenu = () => {
    setIsOpen(false);
  }

  useOnResize({ onResize: handleCloseMenu })

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PageContainer>
          <Header
            menu={MENU}
            isOpen={isOpen}
            toggleMenu={handleToggleMenu}
          />
          <MobileMenu
            menu={MENU}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {children}
          <Footer menu={MENU} socials={SOCIALS} />
        </PageContainer>
        <ScrollRestoration />
        <script
          src="https://kit.fontawesome.com/1aad4926f4.js"
          crossOrigin="anonymous"
          defer
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
