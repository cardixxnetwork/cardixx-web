import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: [
    "src/graphql/fragments/**/*.graphql",
    "src/graphql/operations/**/*.graphql",
  ],
  generates: {
    "src/graphql/generated/": {
      config: {
        dedupeFragments: true,
        enumsAsTypes: true,
        skipTypename: false,
        useTypeImports: true,
      },
      plugins: [],
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL
    ? `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`
    : "../cardixx-core/src/schema.gql",
};

export default config;
