# 🌟 github-mcp-plus 🚀

[![npm version](https://badge.fury.io/js/github-mcp-plus.svg)](https://badge.fury.io/js/github-mcp-plus)
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/sh20raj.github-mcp-plus?label=marketplace)](https://marketplace.visualstudio.com/items?itemName=sh20raj.github-mcp-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Visitors](https://api.visitorbadge.io/api/combined?path=github-mcp-plus&countColor=%23263759&style=plastic&labelStyle=upper)](https://visitorbadge.io/status?path=github-mcp-plus)

An enhanced, **open-source developer friendly**, Node.js-based implementation of the official **GitHub Model Context Protocol (MCP)** Server.

This version runs purely on Node.js and can be easily executed using `npx`. It includes **100+ elite tools** covering every major GitHub workflow — from enterprise administration to deployment management — making it the most comprehensive GitHub MCP server available.

> **Ultimate Tool for GSoC, Enterprise & Open-Source Contributors.** Manage organizations, sync forks, check CI status, audit enterprise logs, handle SSH keys, and star projects — all via your AI assistant.

---

## ✨ Why github-mcp-plus?

| Feature              | Official (Docker)      | **github-mcp-plus**  |
| -------------------- | ---------------------- | -------------------- |
| Setup                | Docker required        | `npx` — zero install |
| Tool Count           | ~40                    | **101 (Elite)**      |
| Enterprise Admin     | ❌                     | ✅                   |
| DevOps (Deployments) | ❌                     | ✅                   |
| Packages Management  | ❌                     | ✅                   |
| SSH/GPG Key Mgmt     | ❌                     | ✅                   |
| Org/Team Membership  | ❌                     | ✅                   |
| Fork Synchronization | ❌                     | ✅                   |
| Gist Management      | ❌                     | ✅                   |

---

## 🛠️ The "Big 100" Elite Toolset

### 📂 Repository & Context (26 tools)
Fork repos, sync with upstream, manage branches, and explore file trees recursively.
- `sync_fork`, `fork_repository`, `create_branch`, `get_repository_tree`, `search_code`, `star_repository`, etc.

### 💬 Issues & Pull Requests (22 tools)
Complete PR lifecycle management including diffs and inline review comments.
- `add_pr_review_comment`, `submit_pr_review`, `get_pr_diff`, `merge_pull_request`, `list_pr_files`, etc.

### 🏢 User & Organization Management (13 tools)
Manage profiles, track team memberships, and follow/unfollow users.
- `list_orgs_for_authenticated_user`, `list_org_teams`, `list_org_members`, `follow_user`, `get_me`, etc.

### 🔐 Keys & Webhooks (11 tools)
Handle security identities and automated integrations.
- `add_public_ssh_key_for_authenticated_user`, `add_gpg_key_for_authenticated_user`, `create_repo_webhook`, etc.

### 🚀 DevOps & Infrastructure (5 tools)
Monitor deployments, list packages, and manage codespaces.
- `create_deployment`, `list_deployments`, `list_packages_for_org`, `list_codespaces_for_authenticated_user`, etc.

### ⚔️ Enterprise & Compliance (3 tools)
Audit logs and enterprise-level management for large organizations.
- `get_enterprise`, `list_enterprise_audit_log`.

### ⚙️ GitHub Actions & Monitoring (8 tools)
Trigger workflows and monitor site-wide notifications or code scanning alerts.
- `actions_run_trigger`, `list_check_runs_for_ref`, `list_notifications_for_authenticated_user`, etc.

---

## 🔌 Installation Guides

### 🧑‍🚀 Antigravity / Claude Desktop
Add this to your `mcp_config.json`:

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

### 💻 Cursor / Windsurf
Add a new command-type server:
- **Command**: `npx -y -q github-mcp-plus@latest`
- **Env**: `GITHUB_PERSONAL_ACCESS_TOKEN`

---

## 👨‍💻 Local Development

1. Clone the repository.
2. Run `npm install`
3. Build & Run:
```bash
npm run build
GITHUB_PERSONAL_ACCESS_TOKEN="your-token" node build/index.js
```

## 📄 License
MIT
