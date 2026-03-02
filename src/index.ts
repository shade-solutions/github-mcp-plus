#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import { Octokit } from "octokit";
import { registerRepositoryTools, handleRepositoryTools } from "./tools/repository.js";
import { registerIssueTools, handleIssueTools } from "./tools/issues.js";
import { registerActionTools, handleActionTools } from "./tools/actions.js";
import { registerExtraTools, handleExtraTools } from "./tools/extra.js";

const GITHUB_PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

if (!GITHUB_PERSONAL_ACCESS_TOKEN) {
  console.error("GITHUB_PERSONAL_ACCESS_TOKEN environment variable is not set");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_PERSONAL_ACCESS_TOKEN });

const server = new Server({
  name: "github-mcp",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {}
  }
});

const tools = [
  {
    name: "get_me",
    description: "Get the authenticated user",
    inputSchema: {
      type: "object",
      properties: {},
    }
  },
  ...registerRepositoryTools(),
  ...registerIssueTools(),
  ...registerActionTools(),
  ...registerExtraTools()
];

// Implement Tool registration
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Implement Tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: params } = request.params;
  try {
    if (name === "get_me") {
      const { data } = await octokit.rest.users.getAuthenticated();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    const repoResult = await handleRepositoryTools(name, params, octokit);
    if (repoResult) return repoResult;

    const issueResult = await handleIssueTools(name, params, octokit);
    if (issueResult) return issueResult;

    const actionResult = await handleActionTools(name, params, octokit);
    if (actionResult) return actionResult;

    const extraResult = await handleExtraTools(name, params, octokit);
    if (extraResult) return extraResult;

    throw new McpError(ErrorCode.MethodNotFound, `Tool not found: ${name}`);
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `GitHub API error: ${error.message}` }],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub MCP Server started successfully"); // Standard error is used to separate from MCP JSON traffic on stdout
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
