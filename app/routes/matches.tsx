import { Link, useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import RichText from "~/components/RichText";
import Image from "~/components/Image";
import { WRESTLING_SITE_SETTINGS_REQUEST, WRESTLING_SITE_MATCHES_PAGE_REQUEST, WRESTLING_SITE_MATCHES_REQUEST } from "~/constants/requests";
import { getSanityClient } from "~/lib/client";
import type { WrestlingSiteSettings, WrestlingMatchesPage, WrestlingMatch } from "~/types/sanity";
import type { Route } from "./+types/matches";
import { formatDate } from "~/util/formatDate";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  matchData: {
    title?: string;
    content?: WrestlingMatchesPage["content"];
  };
  matches: WrestlingMatch[];
}

export async function loader() {
  const client = getSanityClient();

  const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
  const matchPage: WrestlingMatchesPage = await client.fetch(WRESTLING_SITE_MATCHES_PAGE_REQUEST);
  const matches: WrestlingMatch[] = await client.fetch(WRESTLING_SITE_MATCHES_REQUEST);

  const siteTitle = settings?.title;
  const pageTitle = matchPage?.pageTitle;

  const matchData = {
    title: matchPage?.title,
    content: matchPage?.content,
  }

  return { siteTitle, pageTitle, matchData, matches };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  const pageTitle = data?.pageTitle ?? "Matches";

  return [
    { title: `${siteTitle} | ${pageTitle}` },
  ];
}


export default function Matches() {
  const { matchData, matches } = useLoaderData<LoaderData>();
  return (
    <Page>
      <Container className="py-16 space-y-4">
        <h1 className="text-4xl font-bold">{matchData.title}</h1>
        <RichText value={matchData.content ?? []} />
      </Container>
      <Container className="py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map((match) => (
            <Link
              to={`/matches/${match.slug.current}`}
              key={match.slug.current}
              className="group no-underline"
            >
              <article
                key={match.slug.current}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-200">
                  {match.matchImages?.[0] && (
                    <Image
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      asset={match.matchImages[0]?.asset._ref}
                      alt={match.matchTitle || 'Match Image'}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <header className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {formatDate(match.matchDate)}
                    </p>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {match.matchTitle}
                    </h2>
                  </header>
                  <div className="line-clamp-3 text-sm text-slate-700">
                    <RichText value={match.matchDescription ?? []} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </Page>
  );
}
