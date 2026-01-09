import Container from "~/components/Container";
import Page from "~/components/Page";
import { WRESTLING_SITE_SETTINGS_REQUEST, WRESTLING_SITE_GALLERY_PAGE_REQUEST } from "~/constants/requests";
import { getSanityClient } from "~/lib/client";
import type { Route } from "./+types/gallery";
import type { WrestlingSiteSettings, WrestlingGalleryPage } from "~/types/sanity";
import { useLoaderData } from "react-router";
import RichText from "~/components/RichText";
import GridGallery from "~/components/GridGallery";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  title?: string;
  content?: WrestlingGalleryPage["content"];
  gallery?: WrestlingGalleryPage["galleryImages"];
}

export async function loader() {
  const client = getSanityClient();

  const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
  const home: WrestlingGalleryPage = await client.fetch(WRESTLING_SITE_GALLERY_PAGE_REQUEST);

  console.log({ home })

  const siteTitle = settings?.title;
  const pageTitle = home?.pageTitle;
  const title = home?.title;
  const content = home?.content;
  const gallery = home?.galleryImages;

  return { siteTitle, pageTitle, title, content, gallery };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  const pageTitle = data?.pageTitle ?? "Home";
  return [
    { title: `${siteTitle} | ${pageTitle}` },
  ];
}

export default function Gallery() {
  const { title, content, gallery } = useLoaderData<LoaderData>();
  return (
    <Page>
      <Container className="py-16 space-y-8">
        <div className="space-y-4">
        <h1 className="text-4xl">{title}</h1>
        <RichText value={content ?? []} />
        </div>
        <div>
          <GridGallery images={gallery ?? []} title="Gallery Images" />
        </div>
      </Container>
    </Page>
  );
}