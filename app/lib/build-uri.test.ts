import { describe, expect, it } from "vitest";
import buildUri from "./build-uri";

describe("buildUri", () => {
    it("should return the correct uri", () => {
        expect(buildUri("/api/auth/login", "https://localhost:3000")).toBe("https://localhost:3000/api/auth/login");
    });

    it("for empty backendUri, it should throw an error", () => {
        expect(() => buildUri("/api/auth/login", "")).toThrow("VITE_BACKEND_URI is not set");
    });

    it("the path should be normalized", () => {
        expect(buildUri("api/auth/login", "https://localhost:3000")).toBe("https://localhost:3000/api/auth/login");
        expect(buildUri("api/auth/login/", "https://localhost:3000")).toBe("https://localhost:3000/api/auth/login");
    });
});
