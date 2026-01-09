import { createImageUrlBuilder } from "@sanity/image-url";

export function imageBuilder(source: string) {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID!;
  const dataset = import.meta.env.VITE_SANITY_DATASET!;

  return createImageUrlBuilder({
    projectId,
    dataset
  }).image(source);
}
