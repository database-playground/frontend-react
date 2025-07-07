import { render } from "~/lib/test-render";
import LoginButton from "./login-button";
import { describe, it, expect, vi } from "vitest";
import { page } from "@vitest/browser/context";

vi.mock("~/lib/build-uri", () => ({
  default: (path: string) => path,
}));

describe("LoginButton", () => {
  it("renders a link with the correct href", () => {
    render(<LoginButton />);
    const link = page.getByRole("link");
    expect(link).toHaveAttribute("href", "/api/auth/google/login");
  });

  it("renders the button with icon and text", () => {
    render(<LoginButton />);
    expect(page.getByText("登入")).toBeInTheDocument();
  });
});
