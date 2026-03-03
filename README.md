# 🌟 github-mcp-plus 🚀

[![npm version](https://badge.fury.io/js/github-mcp-plus.svg)](https://badge.fury.io/js/github-mcp-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enhanced, **open-source developer friendly**, Node.js-based implementation of the official **GitHub Model Context Protocol (MCP)** Server.

Unlike the official GitHub MCP server which requires a heavy Docker setup, this version runs purely on Node.js and can be easily executed using `npx`. It includes **46 tools** covering every major GitHub workflow — from PR reviews to gist creation — making it the most comprehensive GitHub MCP server available.

> **Built for open-source contributors.** Fork repos, review PRs, comment on issues, manage labels, search code, star projects — all from your AI assistant.

---

## ✨ Why github-mcp-plus?

| Feature              | Official (Docker)      | **github-mcp-plus**       |
| -------------------- | ---------------------- | ------------------------- |
| Setup                | Docker required        | `npx` — zero install      |
| Runtime              | Go binary in container | Native Node.js            |
| Tools                | ~40                    | **46+**                   |
| PR Review Comments   | ❌                     | ✅                        |
| Submit PR Reviews    | ❌                     | ✅                        |
| PR Diffs             | ❌                     | ✅                        |
| Commit Diffs         | ❌                     | ✅                        |
| Fork Repos           | ❌                     | ✅                        |
| Star/Unstar          | ❌                     | ✅                        |
| Gist Management      | ❌                     | ✅                        |
| Open Source Friendly | —                      | ✅ Built for contributors |

---

## 🛠️ All 46 Tools

### 📂 Repository Management (18 tools)

| Tool                        | Description                    |
| --------------------------- | ------------------------------ |
| `get_file_contents`         | Get file or directory contents |
| `create_or_update_file`     | Create or update a file        |
| `delete_file`               | Delete a file from a repo      |
| `search_repositories`       | Search for repositories        |
| `create_repository`         | Create a new repository        |
| `fork_repository`           | Fork a repo to your account    |
| `create_branch`             | Create a new branch            |
| `list_branches`             | List all branches              |
| `list_commits`              | List commits with filters      |
| `get_commit`                | Get commit details             |
| `get_repository_tree`       | Full recursive file tree       |
| `list_contributors`         | List repo contributors         |
| `search_code`               | Search code across GitHub      |
| `search_users`              | Search for GitHub users        |
| `star_repository`           | Star a repository              |
| `unstar_repository`         | Unstar a repository            |
| `list_stargazers`           | List users who starred a repo  |
| `list_starred_repositories` | List starred repos             |

### 💬 Issues & Pull Requests (17 tools)

| Tool                    | Description                                |
| ----------------------- | ------------------------------------------ |
| `create_issue`          | Create a new issue                         |
| `issue_read`            | Read an issue or PR                        |
| `update_issue`          | Update issue title/body/state/labels       |
| `list_issues`           | List issues with filters                   |
| `search_issues`         | Search issues across GitHub                |
| `add_issue_comment`     | Comment on an issue or PR                  |
| `list_issue_comments`   | List comments on an issue                  |
| `add_label`             | Add labels to an issue/PR                  |
| `remove_label`          | Remove a label                             |
| `create_pull_request`   | Open a new PR                              |
| `update_pull_request`   | Update a PR                                |
| `merge_pull_request`    | Merge a PR                                 |
| `list_pull_requests`    | List PRs with filters                      |
| `list_pr_files`         | List files changed in a PR                 |
| `add_pr_review_comment` | Add inline review comment on PR            |
| `get_pr_comments`       | List all review comments on a PR           |
| `submit_pr_review`      | Approve, request changes, or comment on PR |

### ⚙️ GitHub Actions (2 tools)

| Tool                  | Description                     |
| --------------------- | ------------------------------- |
| `actions_list`        | List all workflows in a repo    |
| `actions_run_trigger` | Trigger a workflow via dispatch |

### 🔥 Extra Tools (8 tools)

| Tool                 | Description                     |
| -------------------- | ------------------------------- |
| `get_pr_diff`        | Get the raw `.diff` of a PR     |
| `get_commit_diff`    | Get the raw `.diff` of a commit |
| `create_release`     | Create a GitHub release         |
| `list_releases`      | List releases for a repo        |
| `get_latest_release` | Get the latest release          |
| `list_tags`          | List tags in a repo             |
| `create_gist`        | Create a new gist               |
| `list_gists`         | List your gists                 |

### 🧑‍💻 Utilities (1 tool)

| Tool     | Description                 |
| -------- | --------------------------- |
| `get_me` | Get authenticated user info |

---

## 🔌 Installation Guides

This server requires a GitHub Personal Access Token (`GITHUB_PERSONAL_ACCESS_TOKEN`).

> **Note**: Standard `repo` scope is usually sufficient, though `workflow` scope is needed for triggering Actions.

### 🖥️ Claude Desktop

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

1. Open Cursor Settings → **Features** → **MCP**.
2. Add a new server:
   - **Type**: `command`
   - **Name**: `github`
   - **Command**: `npx -y github-mcp-plus`
3. Set `GITHUB_PERSONAL_ACCESS_TOKEN` in your environment.

Or create `.cursor/mcp.json`:

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

### 🏄‍♂️ Windsurf

Configure in `windsurf.config.json` or through the UI:

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

### 🧑‍🚀 Antigravity

Add to your `mcp_config.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "-q", "github-mcp-plus@latest"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token"
      }
    }
  }
}
```

### 🔧 Any MCP Client / CLI

```bash
GITHUB_PERSONAL_ACCESS_TOKEN="your-github-token" npx -y github-mcp-plus
```

---

## 🤝 Contributing

This project is built for the open-source community! Contributions are welcome:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

---

## 👨‍💻 Local Development

```bash
git clone https://github.com/shade-solutions/github-mcp-plus.git
cd github-mcp-plus
npm install
npm run build
GITHUB_PERSONAL_ACCESS_TOKEN="your-token" node build/index.js
```

---

## 📄 License

MIT
