import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID!;
const dataset = import.meta.env.VITE_SANITY_DATASET!;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? "2025-12-29";

interface SanityClientOptions {
  token?: string;
  useCdn?: boolean;
}

export function getSanityClient(opts?: SanityClientOptions) {
  const hasToken = Boolean(opts?.token);

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: opts?.useCdn ?? !hasToken,
    token: opts?.token,
    perspective: hasToken ? "drafts" : "published",
  });
}
