// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Authentication utility functions extracted for testing
export function getPersonalAccessToken(cliPat?: string): string | undefined {
  return cliPat || process.env.AZURE_DEVOPS_PAT;
}