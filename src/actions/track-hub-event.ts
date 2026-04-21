"use server";

import { graphqlFetch } from "@/lib/graphql-client";

const TRACK_PUBLIC_HUB_EVENT = `
  mutation TrackPublicHubEvent($hubId: String!, $interactionType: String!) {
    trackPublicHubEvent(hubId: $hubId, interactionType: $interactionType)
  }
`;

export async function trackHubInteraction(
  hubId: string,
  interactionType: string
) {
  try {
    await graphqlFetch(TRACK_PUBLIC_HUB_EVENT, { hubId, interactionType });
  } catch {
    // Fire and forget
  }
}
