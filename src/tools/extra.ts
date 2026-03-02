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
    }
  ];
}

export async function handleExtraTools(name: string, params: any, octokit: Octokit) {
  if (name === "get_pr_diff") {
    const { owner, repo, pull_number } = params;
    const { data } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number,
      mediaType: { format: 'diff' }
    });
    return { content: [{ type: "text", text: String(data) }] };
  }

  if (name === "get_commit_diff") {
    const { owner, repo, ref } = params;
    const { data } = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref,
      mediaType: { format: 'diff' }
    });
    return { content: [{ type: "text", text: String(data) }] };
  }

  if (name === "create_release") {
    const { owner, repo, tag_name, name, body, draft, prerelease, generate_release_notes } = params;
    const { data } = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name,
      name,
      body,
      draft,
      prerelease,
      generate_release_notes
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
