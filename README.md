# 🌟 github-mcp-plus 🚀

[![npm version](https://badge.fury.io/js/github-mcp-plus.svg)](https://badge.fury.io/js/github-mcp-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enhanced, Node.js-based implementation of the official **GitHub Model Context Protocol (MCP)** Server.

Unlike the official GitHub MCP server which requires a heavy Docker setup, this version runs purely on Node.js and can be easily executed using `npx`. It includes a wide range of official tools as well as **"extra tools"** that provide even deeper context for AI agents (e.g., fetching PR diffs directly).

This allows Claude, Cursor, Windsurf, Windsurf, Antigravity, and other MCP clients to instantly search repositories, read issues, trigger actions, and analyze PR diffs without touching a terminal.

---

## ✨ Features

- **No Docker Required**: Just `npx github-mcp-plus`
- **100% Native Node.js**: Fast, lightweight, and easy to deploy.
- **Enhanced Toolset**: Includes all official capabilities + deep programmatic tools like extracting source `.diff`s.

---

## 🛠️ Tools Provided

### 1. 📂 Repository

- `get_file_contents` - Get the contents of a file or directory.
- `create_or_update_file` - Commit changes directly to repositories.
- `search_repositories` - Search for repositories on GitHub.

### 2. 💬 Issues & Pull Requests

- `create_issue` - Create a new issue.
- `issue_read` - Read an issue or pull request.
- `create_pull_request` - Open a new pull request.
- `merge_pull_request` - Merge an existing pull request.

### 3. ⚙️ GitHub Actions

- `actions_list` - Discover repository workflows.
- `actions_run_trigger` - Trigger specific workflows via `workflow_dispatch`.

### 4. 🔥 Extra Tools (Exclusive to mcp-plus)

- `get_pr_diff` - Fetch the raw programmatic `.diff` of a pull request.
- `get_commit_diff` - Fetch the diff of any specific commit.
- `create_release` - Programmatically draft and publish GitHub releases.

### 5. 🧑‍💻 Utilities

- `get_me` - Get info about the authenticated user.

---

## 🔌 Installation Guides for IDEs & Clients

This server requires a GitHub Personal Access Token (`GITHUB_PERSONAL_ACCESS_TOKEN`).

> **Note**: Standard `repo` scope is usually sufficient, though `workflow` scope is needed for triggering Actions.

### 🖥️ Clause Desktop App

Add the following to your `claude_desktop_config.json`:

- **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

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

### 💻 Cursor

Cursor allows you to configure MCP servers directly within the UI or via `.cursor/mcp.json`:

1. Open Cursor Settings.
2. Navigate to **Features** -> **MCP**.
3. Add a new server:
   - **Type**: `command`
   - **Name**: `github`
   - **Command**: `npx -y github-mcp-plus`
4. Make sure your environment has `GITHUB_PERSONAL_ACCESS_TOKEN` exported, or define it in Cursor's environment settings.

### 🏄‍♂️ Windsurf

For Windsurf, you typically configure MCPs in your project or global `windsurf.config.json` or through the Windsurf UI:

```json
{
  "mcp": {
    "servers": [
      {
        "name": "github",
        "command": "npx -y github-mcp-plus",
        "env": {
          "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token"
        }
      }
    ]
  }
}
```

### 🧑‍🚀 Antigravity / General CLI

Since it's highly compatible with the official SDK, any conforming MCP client can run the tool:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN="your-github-token" npx -y github-mcp-plus
```

---

## 👨‍💻 Local Development

1. Clone the repository.
2. Run `npm install`
3. Build the server: `npm run build`
4. The server can be run manually:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN="your-github-token" node build/index.js
```
