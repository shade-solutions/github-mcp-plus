# github-mcp-plus

An enhanced, Node-based implementation of the official GitHub Model Context Protocol (MCP) Server.

Unlike the official GitHub MCP server which requires Docker, this version runs purely on Node.js and can be easily run using `npx`. It includes a wide range of official tools as well as "extra" tools that provide even deeper context (e.g., fetching PR diffs directly).

## Tools Provided

- **Repository**: `get_file_contents`, `create_or_update_file`, `search_repositories`
- **Issues & PRs**: `create_issue`, `issue_read`, `create_pull_request`, `merge_pull_request`
- **Actions**: `actions_list`, `actions_run_trigger`
- **Extra Tools**: `get_pr_diff`, `get_commit_diff`, `create_release`
- **Misc**: `get_me`

## Setup & Running

This server requires a GitHub Personal Access Token. Standard `repo` scope is usually sufficient, though `workflow` scope is needed for triggering Actions.

### Using `npx` (No Installation Required)

You can run this MCP directly in your MCP Client configuration.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp-plus"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token"
      }
    }
  }
}
```

### Local Development

1. Clone the repository.
2. Run `npm install`.
3. Build the server: `npm run build`.
4. The server can be run manually using `GITHUB_PERSONAL_ACCESS_TOKEN="..." node build/index.js`.
