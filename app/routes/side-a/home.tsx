import { useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import { WRESTLING_SITE_HOME_PAGE_REQUEST, WRESTLING_SITE_SETTINGS_REQUEST } from "~/constants/requests";
import { getSanityClient } from "~/lib/client";
import RichText from "~/components/RichText";
import type { WrestlingHomePage, WrestlingSiteSettings } from "~/types/sanity";
import type { Route } from "../+types/home";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  hero: {
    title: string;
    subTitle: string;
    content: any[];
    backgroundImage?: WrestlingHomePage["heroSectionBackgroundImage"];
  }
}

export async function loader() {
  try {
    const client = getSanityClient();

    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
    const home: WrestlingHomePage = await client.fetch(WRESTLING_SITE_HOME_PAGE_REQUEST);

    const siteTitle = settings?.title;
    const pageTitle = home?.pageTitle;

    const hero = {
      title: home?.heroTitle,
      subTitle: home?.heroSubtitle,
      content: home?.heroContent,
      backgroundImage: home?.heroSectionBackgroundImage,
    }

    return { siteTitle, pageTitle, hero };
  } catch (err) {
    if (err instanceof Response) throw err;
    throw new Response("Sanity configuration error", { status: 500, statusText: "Sanity configuration error" });
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  const pageTitle = data?.pageTitle ?? "Home";
  return [
    { title: `${siteTitle} | ${pageTitle}` },
  ];
}

export default function Home() {
  const data = useLoaderData<LoaderData>();
  const hero = data?.hero;

  return (
    <Page className="flex items-center justify-center">
      <Container>
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl">{hero.title}</h1>
            <h2 className="text-2xl">{hero.subTitle}</h2>
          </div>
          <RichText value={hero.content} />
        </div>
      </Container>
    </Page>
  );
}
