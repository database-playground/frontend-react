import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://api.dbplay.app/query",
  documents: ["app/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./app/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
