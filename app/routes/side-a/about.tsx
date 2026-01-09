import { useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import RichText from "~/components/RichText";
import Image from "~/components/Image";
import GridGallery from "~/components/GridGallery";
import { getSanityClient } from "~/lib/client";
import { WRESTLING_SITE_SETTINGS_REQUEST, WRESTLING_SITE_ABOUT_PAGE_REQUEST, WRESTLING_SITE_GALLERY_PAGE_REQUEST } from "~/constants/requests";
import type { SanityImage, WrestlingAboutPage, WrestlingGalleryPage, WrestlingSiteSettings } from "~/types/sanity";
import type { Route } from "../side-a/+types/about";
import { LinkButton } from "~/components/Buttons";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  about: {
    title: string;
    subtitle: string;
    content: any[];
    featuredImage?: WrestlingAboutPage["featuredImage"];
  }
  gallery?: SanityImage[];
}

export async function loader() {
  try {
    const client = getSanityClient();

    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
    const about: WrestlingAboutPage = await client.fetch(WRESTLING_SITE_ABOUT_PAGE_REQUEST);
    const galleryItems: WrestlingGalleryPage = await client.fetch(WRESTLING_SITE_GALLERY_PAGE_REQUEST);

    const siteTitle = settings?.title;
    const pageTitle = about?.pageTitle;

    const aboutContent = {
      title: about?.title,
      subtitle: about?.subtitle,
      content: about?.content,
      featuredImage: about?.featuredImage,
    }

    const gallery = galleryItems?.galleryImages?.slice(0, 10) ?? [];

    return { siteTitle, pageTitle, about: aboutContent, gallery };
  } catch (err) {
    if (err instanceof Response) throw err;
    throw new Response("Sanity configuration error", { status: 500, statusText: "Sanity configuration error" });
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  const pageTitle = data?.pageTitle ?? "About";
  return [
    { title: `${siteTitle} | ${pageTitle}` },
  ];
}

export default function About() {
  const data = useLoaderData<LoaderData>();
  const about = data?.about;
  const gallery = data?.gallery;

  return (
    <>
      <Page className="flex flex-col gap-16 items-center justify-center">
        <Container className="py-16">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="grid-cols-1">
              <div className="rounded-lg overflow-hidden mx-auto aspect-3/4">
                <Image className="h-full object-cover" asset={about.featuredImage?.asset._ref} />
              </div>
            </div>
            <div className="grid-cols-1 space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">{about.title}</h1>
                <h2 className="text-2xl">{about.subtitle}</h2>
              </div>
              <div>
                <RichText value={about.content} />
              </div>
            </div>
          </div>
        </Container>
        <Container>
          {gallery && gallery.length > 0 && (
            <div className="mt-8 space-y-8">
              <div className="px-4">
                <h2 className="text-3xl font-bold">Gallery</h2>
              </div>
              <GridGallery images={gallery} title="Gallery" />
              <div className="flex justify-end">
                <LinkButton to="/side-a/gallery">View Full Gallery</LinkButton>
              </div>
            </div>
          )}
        </Container>
      </Page>
    </>
  );
}