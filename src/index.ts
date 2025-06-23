#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { serverBuildAndConnect } from "./server.js";
import { packageVersion } from "./version.js";

const args = process.argv.slice(2);
if (args.length === 0) {  console.error(
    "Usage: mcp-server-azuredevops <organization_name>"
  );
  process.exit(1);
}
const orgName = args[0];

try {
  await serverBuildAndConnect(orgName, new StdioServerTransport());
  console.log("Azure DevOps MCP Server with stdio transport running. Version: " + packageVersion);
} catch (error) {
  console.error("Fatal error in main():", error);
  process.exit(1);
};
