import { Octokit } from "octokit";

export function registerIssueTools() {
  return [
    {
      name: "create_issue",
      description: "Create an issue in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          title: { type: "string" },
          body: { type: "string" },
          assignees: { type: "array", items: { type: "string" } },
          labels: { type: "array", items: { type: "string" } }
        },
        required: ["owner", "repo", "title"]
      }
    },
    {
      name: "issue_read",
      description: "Read an issue or pull request in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          issue_number: { type: "number" }
        },
        required: ["owner", "repo", "issue_number"]
      }
    },
    {
      name: "create_pull_request",
      description: "Create a pull request in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          title: { type: "string" },
          body: { type: "string", description: "The contents of the pull request." },
          head: { type: "string", description: "The name of the branch where your changes are implemented." },
          base: { type: "string", description: "The name of the branch you want the changes pulled into. This should be an existing branch on the current repository." },
          draft: { type: "boolean", description: "Indicates whether the pull request is a draft. See 'Draft Pull Requests' in the GitHub Help documentation for more information." }
        },
        required: ["owner", "repo", "title", "head", "base"]
      }
    },
    {
      name: "merge_pull_request",
      description: "Merge a pull request in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          pull_number: { type: "number" },
          commit_title: { type: "string" },
          commit_message: { type: "string" },
          merge_method: { type: "string", enum: ["merge", "squash", "rebase"], description: "The merge method to use. Default is 'merge'." }
        },
        required: ["owner", "repo", "pull_number"]
      }
    }
  ];
}

export async function handleIssueTools(name: string, params: any, octokit: Octokit) {
  if (name === "create_issue") {
    const { owner, repo, title, body, assignees, labels } = params;
    const { data } = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
      assignees,
      labels
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
  
  if (name === "issue_read") {
    const { owner, repo, issue_number } = params;
    const { data } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "create_pull_request") {
    const { owner, repo, title, body, head, base, draft } = params;
    const { data } = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      body,
      head,
      base,
      draft
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "merge_pull_request") {
    const { owner, repo, pull_number, commit_title, commit_message, merge_method } = params;
    const { data } = await octokit.rest.pulls.merge({
      owner,
      repo,
      pull_number,
      commit_title,
      commit_message,
      merge_method: merge_method as any
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
