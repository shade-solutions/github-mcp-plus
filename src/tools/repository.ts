import { Octokit } from "octokit";

export function registerRepositoryTools() {
  return [
    {
      name: "get_file_contents",
      description: "Get the contents of a file or directory in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          path: { type: "string" },
          branch: { type: "string", description: "Optional branch name. Defaults to repository default branch." }
        },
        required: ["owner", "repo", "path"]
      }
    },
    {
      name: "create_or_update_file",
      description: "Create or update a file in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          path: { type: "string" },
          message: { type: "string", description: "Commit message" },
          content: { type: "string", description: "File content" },
          sha: { type: "string", description: "The blob SHA of the file being replaced. Required to update an existing file." },
          branch: { type: "string", description: "Optional branch name" }
        },
        required: ["owner", "repo", "path", "message", "content"]
      }
    },
    {
      name: "delete_file",
      description: "Delete a file from a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          path: { type: "string" },
          message: { type: "string", description: "Commit message" },
          sha: { type: "string", description: "The blob SHA of the file being deleted" },
          branch: { type: "string", description: "Optional branch name" }
        },
        required: ["owner", "repo", "path", "message", "sha"]
      }
    },
    {
      name: "search_repositories",
      description: "Search for repositories on GitHub",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query (e.g. 'language:typescript stars:>1000')" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Results per page (max 100)" }
        },
        required: ["query"]
      }
    },
    {
      name: "create_repository",
      description: "Create a new repository for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Repository name" },
          description: { type: "string" },
          private: { type: "boolean", description: "Whether the repository is private. Default: false" },
          auto_init: { type: "boolean", description: "Create an initial commit with a README. Default: false" }
        },
        required: ["name"]
      }
    },
    {
      name: "fork_repository",
      description: "Fork a repository to your account",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          organization: { type: "string", description: "Optional: fork to an organization instead of your personal account" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "create_branch",
      description: "Create a new branch from an existing reference (branch, tag, or SHA)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          branch: { type: "string", description: "Name for the new branch" },
          from_branch: { type: "string", description: "Source branch/tag/SHA to create from. Default: repo default branch" }
        },
        required: ["owner", "repo", "branch"]
      }
    },
    {
      name: "list_branches",
      description: "List branches in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "list_commits",
      description: "List commits on a repository branch",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          sha: { type: "string", description: "Branch name or commit SHA. Default: default branch" },
          path: { type: "string", description: "Filter commits touching this file path" },
          author: { type: "string", description: "GitHub login or email to filter by" },
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "get_commit",
      description: "Get details of a specific commit including files changed",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          ref: { type: "string", description: "Commit SHA, branch name, or tag" }
        },
        required: ["owner", "repo", "ref"]
      }
    },
    {
      name: "get_repository_tree",
      description: "Get the full file tree of a repository (recursive listing of all files)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          branch: { type: "string", description: "Branch name. Default: default branch" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "list_contributors",
      description: "List contributors to a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "search_code",
      description: "Search for code across GitHub repositories",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query (e.g. 'addClass in:file language:javascript repo:jquery/jquery')" },
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: ["query"]
      }
    },
    {
      name: "search_users",
      description: "Search for GitHub users",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query (e.g. 'fullname:Linus Torvalds type:user')" },
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: ["query"]
      }
    },
    {
      name: "star_repository",
      description: "Star a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "unstar_repository",
      description: "Unstar a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "list_stargazers",
      description: "List users who have starred a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "list_starred_repositories",
      description: "List repositories starred by the authenticated user (or another user)",
      inputSchema: {
        type: "object",
        properties: {
          username: { type: "string", description: "Username. Defaults to authenticated user if omitted." },
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: []
      }
    },
    {
      name: "get_repository",
      description: "Get detailed information about a specific repository (including parent if it's a fork)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" }
        },
        required: ["owner", "repo"]
      }
    },
    {
      name: "sync_fork",
      description: "Sync a fork with its upstream repository (merge default branch of upstream into current fork)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string", description: "The owner of the fork" },
          repo: { type: "string", description: "The name of the fork" },
          branch: { type: "string", description: "The name of the branch to sync (usually the default branch)" }
        },
        required: ["owner", "repo", "branch"]
      }
    }
  ];
}

export async function handleRepositoryTools(name: string, params: any, octokit: Octokit) {
  if (name === "get_file_contents") {
    const { owner, repo, path, branch } = params;
    const { data } = await octokit.rest.repos.getContent({ owner, repo, path, ref: branch });
    if (!Array.isArray(data) && data.type === 'file' && data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf8');
      return { content: [{ type: "text", text: content }] };
    }
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "create_or_update_file") {
    const { owner, repo, path, message, content, sha, branch } = params;
    const { data } = await octokit.rest.repos.createOrUpdateFileContents({ owner, repo, path, message, content: Buffer.from(content).toString('base64'), sha, branch });
    return { content: [{ type: "text", text: JSON.stringify(data.commit, null, 2) }] };
  }

  if (name === "delete_file") {
    const { owner, repo, path, message, sha, branch } = params;
    const { data } = await octokit.rest.repos.deleteFile({ owner, repo, path, message, sha, branch });
    return { content: [{ type: "text", text: JSON.stringify(data.commit, null, 2) }] };
  }

  if (name === "search_repositories") {
    const { query, page, perPage } = params;
    const { data } = await octokit.rest.search.repos({ q: query, page, per_page: perPage });
    return { content: [{ type: "text", text: JSON.stringify(data.items, null, 2) }] };
  }

  if (name === "create_repository") {
    const { name: repoName, description, private: isPrivate, auto_init } = params;
    const { data } = await octokit.rest.repos.createForAuthenticatedUser({ name: repoName, description, private: isPrivate, auto_init });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "fork_repository") {
    const { owner, repo, organization } = params;
    const { data } = await octokit.rest.repos.createFork({ owner, repo, organization });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "create_branch") {
    const { owner, repo, branch, from_branch } = params;
    const source = from_branch || (await octokit.rest.repos.get({ owner, repo })).data.default_branch;
    const { data: refData } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${source}` });
    const { data } = await octokit.rest.git.createRef({ owner, repo, ref: `refs/heads/${branch}`, sha: refData.object.sha });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_branches") {
    const { owner, repo, per_page, page } = params;
    const { data } = await octokit.rest.repos.listBranches({ owner, repo, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_commits") {
    const { owner, repo, sha, path, author, per_page, page } = params;
    const { data } = await octokit.rest.repos.listCommits({ owner, repo, sha, path, author, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "get_commit") {
    const { owner, repo, ref } = params;
    const { data } = await octokit.rest.repos.getCommit({ owner, repo, ref });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "get_repository_tree") {
    const { owner, repo, branch } = params;
    const ref = branch || (await octokit.rest.repos.get({ owner, repo })).data.default_branch;
    const { data } = await octokit.rest.git.getTree({ owner, repo, tree_sha: ref, recursive: "true" });
    return { content: [{ type: "text", text: JSON.stringify(data.tree, null, 2) }] };
  }

  if (name === "list_contributors") {
    const { owner, repo, per_page, page } = params;
    const { data } = await octokit.rest.repos.listContributors({ owner, repo, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "search_code") {
    const { query, per_page, page } = params;
    const { data } = await octokit.rest.search.code({ q: query, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data.items, null, 2) }] };
  }

  if (name === "search_users") {
    const { query, per_page, page } = params;
    const { data } = await octokit.rest.search.users({ q: query, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data.items, null, 2) }] };
  }

  if (name === "star_repository") {
    const { owner, repo } = params;
    await octokit.rest.activity.starRepoForAuthenticatedUser({ owner, repo });
    return { content: [{ type: "text", text: `Successfully starred ${owner}/${repo}` }] };
  }

  if (name === "unstar_repository") {
    const { owner, repo } = params;
    await octokit.rest.activity.unstarRepoForAuthenticatedUser({ owner, repo });
    return { content: [{ type: "text", text: `Successfully unstarred ${owner}/${repo}` }] };
  }

  if (name === "list_stargazers") {
    const { owner, repo, per_page, page } = params;
    const { data } = await octokit.rest.activity.listStargazersForRepo({ owner, repo, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_starred_repositories") {
    const { username, per_page, page } = params;
    if (username) {
      const { data } = await octokit.rest.activity.listReposStarredByUser({ username, per_page, page });
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } else {
      const { data } = await octokit.rest.activity.listReposStarredByAuthenticatedUser({ per_page, page });
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  }

  if (name === "get_repository") {
    const { owner, repo } = params;
    const { data } = await octokit.rest.repos.get({ owner, repo });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "sync_fork") {
    const { owner, repo, branch } = params;
    const { data } = await octokit.rest.repos.mergeUpstream({ owner, repo, branch });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
