import Brand from "~/components/header/brand";
import { render, renderWithRouter } from "~/lib/test-render";
import { describe, expect, it } from "vitest";
import { page } from "@vitest/browser/context";
import { createRoutesStub } from "react-router";

describe("Brand", () => {
  it("shows title", async () => {
    renderWithRouter(<Brand />);
    expect(page.getByText("Database Playground")).toBeInTheDocument();
  });

  it("can navigate to homepage", async () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <div>Home</div>,
      },
      {
        path: "/other-page",
        Component: () => (
          <div>
            <Brand />
          </div>
        ),
      },
    ]);

    render(<Stub initialEntries={["/other-page"]} />);
    await page.getByText("Database Playground").click();

    await expect.element(page.getByText("Home")).toBeVisible();
  });
});
