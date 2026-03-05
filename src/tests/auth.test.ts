import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth";
import { describe, expect, test } from "vitest";

describe("person", () => {
  test("request without authorization header", () => {
    const headers: IncomingHttpHeaders = { origin: "192.168.1.1" };
    const result = getAPIKey(headers);
    expect(result).toBeDefined();
    expect(result).toBeNull();
  });

  test("request with wrong authorization header", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey" };
    const result = getAPIKey(headers);
    expect(result).toBeDefined();
    expect(result).toBeNull();

    const headers2: IncomingHttpHeaders = { authorization: "Apikey" };
    const result2 = getAPIKey(headers2);
    expect(result2).toBeDefined();
    expect(result2).toBeNull();
  });

  test("request with authorization header", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey my-api-key" };
    const result = getAPIKey(headers);
    expect(result).toBeDefined();
    expect(result).toBe("my-api-key");
  });
});
