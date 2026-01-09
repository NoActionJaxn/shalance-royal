import React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import PageContainer from "./components/PageContainer";
import MobileMenu from "./components/MobileMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Page from "./components/Page";
import Container from "./components/Container";
import useOnResize from "./hooks/useOnResize";
import { WRESTLING_SITE_SETTINGS_REQUEST } from "./constants/requests";
import { getSanityClient } from "./lib/client";
import type { Route } from "./+types/root";
import type { CallToAction } from "./types/cta";
import type { SanityImage, WrestlingSiteSettings } from "./types/sanity";
import "./app.css";

interface LoaderData {
  description?: string;
  menu: CallToAction[];
  socials: CallToAction[];
  logo?: SanityImage;
  altLogo?: SanityImage;
}

export async function loader(): Promise<LoaderData> {
  try {
    const client = getSanityClient();
    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);

    if (!settings) {
      throw new Response("Match not found", { status: 404 });
    }

    const menu: CallToAction[] = (settings?.menuItems ?? []).map((item) => ({
      label: item.label,
      path: item.url,
    }));

    const socials: CallToAction[] = (settings?.socialNetworkItems ?? []).map((item) => ({
      label: item.label,
      path: item.url,
      icon: {
        prefix: item.icon.iconStyle,
        iconName: item.icon.iconName,
      },
    }));

    const logo: SanityImage | undefined = settings?.logo;
    const altLogo: SanityImage | undefined = settings?.alternateLogo;
    const description: string | undefined = settings?.description;

    return { menu, socials, logo, altLogo, description };
  } catch (err) {
    if (err instanceof Response) throw err;
    
    throw new Response("Sanity configuration error", { status: 500, statusText: "Sanity configuration error" });
  }
}

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

export function Layout({ children }: {children: React.ReactNode}) {
  const data = useLoaderData<LoaderData>();
  
  const menu = data?.menu ?? [];
  const socials = data?.socials ?? [];
  const logo = data?.logo;
  const altLogo = data?.altLogo;
  const description = data?.description;

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
            menu={menu}
            isOpen={isOpen}
            toggleMenu={handleToggleMenu}
          />
          <MobileMenu
            menu={menu}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {children}
          <Footer menu={menu} socials={socials} description={description} />
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

    <Page className="flex items-center justify-center">
      <Container className="space-y-2" fluid>
        <h1 className="text-center text-4xl font-bold">{message}</h1>
        <p className="text-center text-lg">{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </Container>
    </Page>
  );
}
