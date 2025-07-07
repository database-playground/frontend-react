import { describe, it, expect } from "vitest";
import { renderWithRouter } from "~/lib/test-render";
import { ErrorBoundary } from "./index";
import { page } from "@vitest/browser/context";
import type { ErrorResponse } from "react-router";

describe("ErrorBoundary", () => {
  it("renders error message for unknown exception", async () => {
    const error = null;

    renderWithRouter(<ErrorBoundary error={error} params={{}} />);

    expect(page.getByTestId("error-message")).toHaveTextContent("發生錯誤");
    expect(page.getByTestId("error-details")).toHaveTextContent(
      "發生預期外的錯誤。"
    );

    expect(page.getByText("回到首頁")).toBeInTheDocument();
    expect(page.getByText("回報問題")).toBeInTheDocument();
  });

  it("renders error message for Error", async () => {
    const anyError = new Error("Something went wrong");

    renderWithRouter(<ErrorBoundary error={anyError} params={{}} />);

    expect(page.getByTestId("error-message")).toHaveTextContent("發生錯誤");
    expect(page.getByTestId("error-details")).toHaveTextContent(
      "Something went wrong"
    );

    expect(page.getByText("回到首頁")).toBeInTheDocument();
    expect(page.getByText("回報問題")).toBeInTheDocument();

    // stack trace should be rendered
    expect(page.getByText("錯誤詳細資訊")).toBeInTheDocument();
    expect(page.getByTestId("stack-trace")).toHaveTextContent("Error: ");
  });

  it("renders 404 error message", async () => {
    /* 
    declare class ErrorResponseImpl implements ErrorResponse {
      status: number;
      statusText: string;
      data: any;
      private error?;
      private internal;
      constructor(status: number, statusText: string | undefined, data: any, internal?: boolean);
    }
    */
    const error = {
      status: 404,
      statusText: "Not Found",
      data: {},
      internal: true,
    } satisfies ErrorResponse & { internal: true };

    renderWithRouter(<ErrorBoundary error={error} params={{}} />);
    expect(page.getByTestId("error-message")).toHaveTextContent("找不到頁面");
    expect(page.getByTestId("error-details")).toHaveTextContent(
      "找不到指定的頁面。"
    );
    expect(page.getByText("回到首頁")).toBeInTheDocument();

    // 回報問題 button should not be present
    await expect.element(page.getByText("回報問題")).not.toBeInTheDocument();
  });

  it("renders 500 error message", async () => {
    const error = {
      status: 500,
      statusText: "Internal Server Error",
      data: {},
      internal: true,
    } satisfies ErrorResponse & { internal: true };

    renderWithRouter(<ErrorBoundary error={error} params={{}} />);
    expect(page.getByTestId("error-message")).toHaveTextContent("發生錯誤");
    expect(page.getByTestId("error-details")).toHaveTextContent(
      "Internal Server Error"
    );
    expect(page.getByText("回報問題")).toBeInTheDocument();

    // stack trace is not available
    await expect.element(page.getByText("錯誤詳細資訊")).not.toBeInTheDocument();
    await expect.element(page.getByTestId("stack-trace")).not.toBeInTheDocument();
  });
});
