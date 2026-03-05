# 🌟 github-mcp-plus 🚀

[![npm version](https://badge.fury.io/js/github-mcp-plus.svg)](https://badge.fury.io/js/github-mcp-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enhanced, **open-source developer friendly**, Node.js-based implementation of the official **GitHub Model Context Protocol (MCP)** Server.

Unlike the official GitHub MCP server which requires a heavy Docker setup, this version runs purely on Node.js and can be easily executed using `npx`. It includes **50 elite tools** covering every major GitHub workflow — from PR reviews to CI status checking — making it the most comprehensive GitHub MCP server available.

> **Ultimate Tool for GSoC & Open-Source Contributors.** Fork repos, sync with upstream, check CI status, review PRs, comment on issues, manage labels, search code, and star projects — all via your AI assistant.

---

## ✨ Why github-mcp-plus?

| Feature              | Official (Docker)      | **github-mcp-plus**  |
| -------------------- | ---------------------- | -------------------- |
| Setup                | Docker required        | `npx` — zero install |
| Runtime              | Go binary in container | Native Node.js       |
| Tool Count           | ~40                    | **50 (Elite)**       |
| CI Status (Checks)   | ❌                     | ✅                   |
| Fork Synchronization | ❌                     | ✅                   |
| PR Review Comments   | ❌                     | ✅                   |
| Submit PR Reviews    | ❌                     | ✅                   |
| PR Diffs             | ❌                     | ✅                   |
| Commit Diffs         | ❌                     | ✅                   |
| Fork Repos           | ❌                     | ✅                   |
| Star/Unstar          | ❌                     | ✅                   |
| Gist Management      | ❌                     | ✅                   |

---

## 🛠️ The "Big 50" Toolset

### 📂 Repository Management (20 tools)

| Tool                        | Description                                  |
| --------------------------- | -------------------------------------------- |
| `get_repository`            | Get repo details (includes parents of forks) |
| `sync_fork`                 | Merges upstream changes into your fork       |
| `get_file_contents`         | Get file or directory contents               |
| `create_or_update_file`     | Create or update a file                      |
| `delete_file`               | Delete a file from a repo                    |
| `search_repositories`       | Search for repositories                      |
| `create_repository`         | Create a new repository                      |
| `fork_repository`           | Fork a repo to your account                  |
| `create_branch`             | Create a new branch                          |
| `list_branches`             | List all branches                            |
| `list_commits`              | List commits with filters                    |
| `get_commit`                | Get commit details                           |
| `get_repository_tree`       | Full recursive file tree                     |
| `list_contributors`         | List repo contributors                       |
| `search_code`               | Search code across GitHub                    |
| `search_users`              | Search for GitHub users                      |
| `star_repository`           | Star a repository                            |
| `unstar_repository`         | Unstar a repository                          |
| `list_stargazers`           | List users who starred a repo                |
| `list_starred_repositories` | List starred repos                           |

### 💬 Issues & Pull Requests (18 tools)

| Tool                    | Description                                |
| ----------------------- | ------------------------------------------ |
| `get_pull_request`      | Get PR details (includes mergeable status) |
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

### ⚙️ GitHub Actions & CI (3 tools)

| Tool                      | Description                                  |
| ------------------------- | -------------------------------------------- |
| `list_check_runs_for_ref` | **Check CI/CD status** for any branch/SHA/PR |
| `actions_list`            | List all workflows in a repo                 |
| `actions_run_trigger`     | Trigger a workflow via dispatch              |

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

Simply configure your MCP client to use `npx`:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN="your-github-token" npx -y github-mcp-plus@latest
```

---

## 👨‍💻 Contributing

This project is built for the open-source community! Contributions are welcome:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

---

## 🏬 VS Code Marketplace Publishing

This project is now a dual-purpose codebase! It functions as both a standard MCP server and a native VS Code extension.

### 1. Build the Extension

```bash
npm install
npm run package-extension
```

This generates a `github-mcp-plus-1.2.0.vsix` file.

### 2. Manual Test

Install the `.vsix` in VS Code via:

- Command Palette (`Cmd+Shift+P`) → **Extensions: Install from VSIX...**
- Select the generated file.

### 3. Publish to Marketplace

1. Get a [Personal Access Token (PAT)](https://aka.ms/vscode-publish-pat) from Azure DevOps.
2. Login to `vsce`:
   ```bash
   npx vsce login sh20raj
   ```
3. Publish:
   ```bash
   npm run package-extension
   npx vsce publish
   ```

---

## 📄 License

MIT
