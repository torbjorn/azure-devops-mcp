# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build & Development
- `npm run build` - Compile TypeScript to JavaScript in `dist/` directory
- `npm run watch` - Watch for TypeScript changes and rebuild automatically
- `npm run prepare` - Runs build (used by npm lifecycle)
- `npm run clean` - Remove the `dist/` directory

### Testing
- `npm test` - Run all tests with Jest
- Coverage is configured with 40% threshold for branches, functions, lines, and statements
- Tests are located in `test/` directory with pattern `**/?(*.)+(spec|test).[jt]s?(x)`

### Code Quality
- `npm run eslint` - Run ESLint linting
- `npm run eslint-fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format-check` - Check code formatting with Prettier

### Development Tools
- `npm run inspect` - Start MCP inspector for debugging
- `npm run start` - Start the MCP server directly

## Architecture Overview

This is a **Model Context Protocol (MCP) server** that provides Azure DevOps integration for AI assistants. The server follows a modular architecture:

### Core Structure
- **`src/index.ts`** - Main entry point, handles authentication, server setup, and CLI argument parsing
- **`src/tools.ts`** - Central configuration that registers all tool modules
- **`src/prompts.ts`** - Configures MCP prompts for the server
- **`src/useragent.ts`** - Manages user agent strings for HTTP requests
- **`src/utils.ts`** - Shared utility functions

### Tool Modules (src/tools/)
Each Azure DevOps service area has its own tool module:
- **`core.ts`** - Core ADO operations (projects, teams, identities)
- **`work.ts`** - Work tracking (iterations, team management)
- **`workitems.ts`** - Work item CRUD operations
- **`builds.ts`** - Build pipeline operations
- **`repos.ts`** - Repository and pull request operations
- **`releases.ts`** - Release management
- **`wiki.ts`** - Wiki operations
- **`testplans.ts`** - Test plan management
- **`search.ts`** - Search across code, wiki, and work items

### Authentication
- Uses Azure Identity SDK with `DefaultAzureCredential`
- Supports multi-tenant scenarios with `--tenant` flag
- Requires `az login` or other Azure credential sources
- Token scope: `499b84ac-1321-427f-aa17-267ca6975798/.default`

### Key Patterns
- All tools use **azure-devops-node-api** TypeScript client when possible
- Tools are registered via `server.tool()` calls with Zod schema validation
- Each tool module exports a `configure*Tools()` function
- Error handling follows MCP SDK patterns
- Copyright headers required on all source files (except index.ts)

## Development Guidelines

### Adding New Tools
1. Create tool functions in the appropriate `src/tools/` module
2. Use existing Azure DevOps TypeScript clients over direct API calls
3. Follow the established pattern: `configure*Tools(server, tokenProvider, connectionProvider)`
4. Add comprehensive Zod schemas for input validation
5. Include proper error handling and user-friendly messages

### Code Style
- TypeScript with strict mode enabled
- ESLint with TypeScript rules and header enforcement
- Prettier for consistent formatting
- Jest for testing with ts-jest preset

### Testing
- Tests in `test/` directory mirror `src/` structure
- Mock Azure DevOps API responses in `test/mocks/`
- Coverage thresholds set to 40% minimum
- Use `jest-extended` for additional matchers

## Authentication & Usage

The server requires an Azure DevOps organization name as the first argument:
```bash
mcp-server-azuredevops <organization> [--tenant <tenant-id>]
```

Users must be authenticated via Azure CLI (`az login`) or other Azure credential sources before running the server.