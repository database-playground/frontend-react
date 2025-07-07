import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider as Provider } from "@apollo/client/react";
import buildUri from "~/lib/build-uri";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: buildUri("/query"),
    credentials: "include",
  }),
});

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
