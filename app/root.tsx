import { isRouteErrorResponse, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import BaseLayout from "./components/layout/base";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import ApolloProvider from "./context/apollo-context";
import { UserProvider } from "./context/user-context";

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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "發生錯誤";
  let details = "發生預期外的錯誤。";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = is404 ? "找不到頁面" : "發生錯誤";
    details = is404
      ? "找不到指定的頁面。"
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <BaseLayout containerClassName="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Error Icon */}
        <div
          className={`
            mx-auto flex h-16 w-16 items-center justify-center rounded-full
            bg-destructive/10
          `}
        >
          <svg
            className="h-8 w-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error Content */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-foreground">
            {message}
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            {details}
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className={`
            flex flex-col justify-center gap-3
            sm:flex-row
          `}
        >
          <NavLink to="/">
            <Button
              className={`
                flex-1
                sm:flex-none
              `}
            >
              回到首頁
            </Button>
          </NavLink>

          {!is404 && (
            <Button
              variant="outline"
              className={`
                flex-1
                sm:flex-none
              `}
            >
              回報問題
            </Button>
          )}
        </div>

        {/* Stack Trace */}
        {stack && (
          <div className="mt-8 text-left">
            <details className="group">
              <summary
                className={`
                  cursor-pointer text-sm text-muted-foreground transition-colors
                  hover:text-foreground
                `}
              >
                錯誤詳細資訊
              </summary>
              <pre
                className={`
                  mt-3 overflow-x-auto rounded-md border bg-muted/50 p-4 text-xs
                  text-muted-foreground
                `}
              >
                <code>{stack}</code>
              </pre>
            </details>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
