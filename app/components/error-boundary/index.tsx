import { isRouteErrorResponse, NavLink } from "react-router";
import type { Route } from "../../+types/root";
import BaseLayout from "../layout/base";
import { Button } from "../ui/button";
import { CircleAlert } from "lucide-react";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "發生錯誤";
  let details = "發生預期外的錯誤。";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = is404 ? "找不到頁面" : "發生錯誤";
    details = is404 ? "找不到指定的頁面。" : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <BaseLayout containerClassName="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Error Icon */}
        <div
          data-testid="error-icon"
          className={`
            mx-auto flex h-16 w-16 items-center justify-center rounded-full
            bg-destructive/10
          `}
        >
          <CircleAlert className="size-8 text-destructive" />
        </div>

        {/* Error Content */}
        <div className="space-y-3">
          <h1 data-testid="error-message" className={`
            text-2xl font-semibold text-foreground
          `}>{message}</h1>
          <p data-testid="error-details" className={`
            leading-relaxed text-muted-foreground
          `}>{details}</p>
        </div>

        {/* Action Buttons */}
        <div
          className={`
            flex flex-col items-center gap-3
            sm:flex-row sm:justify-center
          `}
        >
          <NavLink to="/">
            <Button>
              回到首頁
            </Button>
          </NavLink>

          {!is404 && (
            <Button variant="outline">
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
                <code data-testid="stack-trace">{stack}</code>
              </pre>
            </details>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
