import { describe, expect, it } from "vitest";
import { renderWithRouter } from "~/lib/test-render";
import BaseLayout from "./base";
import { page } from "@vitest/browser/context";

describe("BaseLayout", () => {
  it("renders the children", async () => {
    renderWithRouter(
      <BaseLayout>
        <div>Hello</div>
      </BaseLayout>
    );

    await expect.element(page.getByText("Hello")).toBeInTheDocument();
  });

  it("renders the header", async () => {
    renderWithRouter(
      <BaseLayout>
        <div>Hello</div>
      </BaseLayout>
    );
    await expect.element(page.getByTestId("header")).toBeVisible();
  });
});
