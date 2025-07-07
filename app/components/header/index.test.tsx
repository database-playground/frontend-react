import Header from "./index";
import { renderWithRouter } from "~/lib/test-render";
import { describe, it, expect, beforeEach } from "vitest";
import { page } from "@vitest/browser/context";
import { UserContext } from "~/context/user-context";
import type { BasicUserInfo } from "~/context/user-context";

const user: BasicUserInfo = {
  name: "Test User",
  email: "test@example.com",
} as BasicUserInfo;

function renderWithUserContext(ctx: React.ComponentProps<typeof UserContext.Provider>["value"]) {
  return renderWithRouter(
    <UserContext.Provider value={ctx}>
      <Header />
    </UserContext.Provider>
  );
}

describe("Header", () => {
  beforeEach(() => {
    // Reset any global mocks if needed
  });

  it("shows spinner when not initialized", async () => {
    renderWithUserContext({ user: undefined, isInitialized: false });
    expect(page.getByTestId("spinner")).toBeVisible();
  });

  it("shows login button when not logged in", async () => {
    renderWithUserContext({ user: undefined, isInitialized: true });
    expect(page.getByText("登入")).toBeVisible();
  });

  it("shows user info when logged in", async () => {
    renderWithUserContext({ user, isInitialized: true });
    expect(page.getByText("Test User")).toBeVisible();
    expect(page.getByText("登出")).toBeVisible();
  });

  it("always shows brand", async () => {
    renderWithUserContext({ user: undefined, isInitialized: false });
    expect(page.getByText("Database Playground")).toBeVisible();
  });
});
