const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL;

if (!GRAPHQL_ENDPOINT) {
  console.warn(
    "⚠️  GRAPHQL_URL environment variable is not set. GraphQL requests will fail."
  );
}

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

interface FetchOptions {
  tags?: string[];
  revalidate?: number | false;
}

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchOptions
): Promise<T> {
  if (!GRAPHQL_ENDPOINT) {
    throw new Error("GRAPHQL_URL environment variable is not configured");
  }

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: {
      tags: options?.tags,
      revalidate: options?.revalidate,
    },
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(`GraphQL error: ${json.errors[0].message}`);
  }

  return json.data;
}
