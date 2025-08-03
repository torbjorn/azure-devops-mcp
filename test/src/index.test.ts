import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { getPersonalAccessToken } from "../../src/auth";

describe("Authentication Functions", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Store original environment
    originalEnv = { ...process.env };
    
    // Clear Azure DevOps PAT environment variable
    delete process.env.AZURE_DEVOPS_PAT;
  });

  afterEach(() => {
    // Restore original environment
    process.env = { ...originalEnv };
  });

  describe("getPersonalAccessToken", () => {
    it("should return CLI PAT when provided", () => {
      const cliPat = "cli-pat-token";
      process.env.AZURE_DEVOPS_PAT = "env-pat-token";
      
      const result = getPersonalAccessToken(cliPat);
      
      expect(result).toBe(cliPat);
    });

    it("should return environment PAT when CLI PAT not provided", () => {
      const envPat = "env-pat-token";
      process.env.AZURE_DEVOPS_PAT = envPat;
      
      const result = getPersonalAccessToken();
      
      expect(result).toBe(envPat);
    });

    it("should return undefined when neither CLI nor environment PAT provided", () => {
      delete process.env.AZURE_DEVOPS_PAT;
      
      const result = getPersonalAccessToken();
      
      expect(result).toBeUndefined();
    });

    it("should return environment PAT when CLI PAT is empty string", () => {
      process.env.AZURE_DEVOPS_PAT = "env-pat-token";
      
      const result = getPersonalAccessToken("");
      
      expect(result).toBe("env-pat-token");
    });

    it("should prioritize CLI PAT over environment PAT", () => {
      const cliPat = "cli-pat-token";
      const envPat = "env-pat-token";
      process.env.AZURE_DEVOPS_PAT = envPat;
      
      const result = getPersonalAccessToken(cliPat);
      
      expect(result).toBe(cliPat);
      expect(result).not.toBe(envPat);
    });

    it("should handle undefined CLI PAT with environment fallback", () => {
      process.env.AZURE_DEVOPS_PAT = "fallback-token";
      
      const result = getPersonalAccessToken(undefined);
      
      expect(result).toBe("fallback-token");
    });

    it("should handle null-like values gracefully", () => {
      delete process.env.AZURE_DEVOPS_PAT;
      
      const result = getPersonalAccessToken(null as any);
      
      expect(result).toBeUndefined();
    });
  });
});