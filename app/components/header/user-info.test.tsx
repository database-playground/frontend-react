import { render } from "~/lib/test-render";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { page } from "@vitest/browser/context";
import { UserInfo } from "./user-info";
import type { BasicUserInfo } from "~/context/user-context";
import buildUri from "~/lib/build-uri";
import { Toaster } from "../ui/sonner";

vi.mock("~/lib/build-uri", () => ({
  default: (path: string) => path,
}));

describe("UserInfo", () => {
  const user: BasicUserInfo = {
    name: "Test User",
    email: "test@example.com",
  } as BasicUserInfo;

  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the user name", async () => {
    render(<UserInfo user={user} />);

    await expect.element(page.getByText("Test User")).toBeVisible();
  });

  it("shows success toast and reloads on successful logout", async () => {
    const okResponse = new Response(null, { status: 205 });
    const mockFn = vi.fn().mockResolvedValue(okResponse);
    vi.stubGlobal("fetch", mockFn);

    const onLogout = vi.fn();
    render(<UserInfo user={user} onLogout={onLogout} />);

    await expect.element(page.getByText("登出")).toBeVisible();

    // click logout button
    await page.getByText("登出").click();

    // logout callback should be called
    expect(onLogout).toHaveBeenCalled();
  });

  it("shows warning toast on failed logout", async () => {
    const errorResponse = new Response("error message", { status: 500 });
    const mockFn = vi.fn().mockResolvedValue(errorResponse);
    vi.stubGlobal("fetch", mockFn);

    const onLogout = vi.fn();
    render(
      <>
        <UserInfo user={user} onLogout={onLogout} />
        <Toaster />
      </>
    );

    await page.getByText("登出").click();

    await expect.element(page.getByText("無法登出。")).toBeVisible();
    await expect.element(page.getByText("error message")).toBeVisible();

    expect(mockFn).toHaveBeenCalledWith(buildUri("/api/auth/logout"), {
      method: "POST",
      credentials: "include",
    });
    expect(onLogout).not.toHaveBeenCalled();
  });
});
