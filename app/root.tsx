import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Toaster } from "./components/ui/sonner";
import ApolloProvider from "./context/apollo-context";
import { UserProvider } from "./context/user-context";
import { ErrorBoundary as ErrorBoundaryComponent } from "./components/error-boundary";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.bunny.net" },
  {
    rel: "stylesheet",
    href: "https://fonts.bunny.net/css?family=ibm-plex-sans-jp:200,400,600",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-hant-tw">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ApolloProvider>
          <UserProvider>
            {children}
            <ScrollRestoration />
            <Scripts />
          </UserProvider>
        </ApolloProvider>
        <Toaster theme="light" />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary(props: Route.ErrorBoundaryProps) {
  return <ErrorBoundaryComponent {...props} />;
}
