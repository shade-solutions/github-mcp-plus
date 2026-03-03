import { Octokit } from "octokit";

export function registerExtraTools() {
  return [
    {
      name: "get_pr_diff",
      description: "Get the raw diff of a Pull Request",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          pull_number: { type: "number" }
        },
        required: ["owner", "repo", "pull_number"]
      }
    },
    {
      name: "get_commit_diff",
      description: "Get the raw diff of a Commit",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          ref: { type: "string", description: "The commit sha or branch/tag ref" }
        },
        required: ["owner", "repo", "ref"]
      }
    },
    {
      name: "create_release",
      description: "Create a GitHub Release",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          tag_name: { type: "string" },
          name: { type: "string" },
          body: { type: "string" },
          draft: { type: "boolean" },
          prerelease: { type: "boolean" },
          generate_release_notes: { type: "boolean" }
        },
        required: ["owner", "repo", "tag_name"]
      }
    },
    {
      name: "list_releases",
      description: "List releases for a repository",
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
      name: "get_latest_release",
      description: "Get the latest release of a repository",
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
      name: "list_tags",
      description: "List tags in a repository",
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
      name: "create_gist",
      description: "Create a new gist (public or secret)",
      inputSchema: {
        type: "object",
        properties: {
          description: { type: "string" },
          public: { type: "boolean", description: "Whether the gist is public. Default: false" },
          files: { type: "object", description: "Object where keys are filenames and values are objects with a 'content' string property" }
        },
        required: ["files"]
      }
    },
    {
      name: "list_gists",
      description: "List gists for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          per_page: { type: "number" },
          page: { type: "number" }
        },
        required: []
      }
    }
  ];
}

export async function handleExtraTools(name: string, params: any, octokit: Octokit) {
  if (name === "get_pr_diff") {
    const { owner, repo, pull_number } = params;
    const { data } = await octokit.rest.pulls.get({ owner, repo, pull_number, mediaType: { format: 'diff' } });
    return { content: [{ type: "text", text: String(data) }] };
  }

  if (name === "get_commit_diff") {
    const { owner, repo, ref } = params;
    const { data } = await octokit.rest.repos.getCommit({ owner, repo, ref, mediaType: { format: 'diff' } });
    return { content: [{ type: "text", text: String(data) }] };
  }

  if (name === "create_release") {
    const { owner, repo, tag_name, name: relName, body, draft, prerelease, generate_release_notes } = params;
    const { data } = await octokit.rest.repos.createRelease({ owner, repo, tag_name, name: relName, body, draft, prerelease, generate_release_notes });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_releases") {
    const { owner, repo, per_page, page } = params;
    const { data } = await octokit.rest.repos.listReleases({ owner, repo, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "get_latest_release") {
    const { owner, repo } = params;
    const { data } = await octokit.rest.repos.getLatestRelease({ owner, repo });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_tags") {
    const { owner, repo, per_page, page } = params;
    const { data } = await octokit.rest.repos.listTags({ owner, repo, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "create_gist") {
    const { description, public: isPublic, files } = params;
    const { data } = await octokit.rest.gists.create({ description, public: isPublic ?? false, files });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_gists") {
    const { per_page, page } = params;
    const { data } = await octokit.rest.gists.list({ per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
