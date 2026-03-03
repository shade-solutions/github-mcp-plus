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
          labels: { type: "array", items: { type: "string" } },
        },
        required: ["owner", "repo", "title"],
      },
    },
    {
      name: "issue_read",
      description: "Read an issue or pull request in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          issue_number: { type: "number" },
        },
        required: ["owner", "repo", "issue_number"],
      },
    },
    {
      name: "update_issue",
      description:
        "Update an existing issue (title, body, state, labels, assignees)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          issue_number: { type: "number" },
          title: { type: "string" },
          body: { type: "string" },
          state: {
            type: "string",
            enum: ["open", "closed"],
            description: "State of the issue",
          },
          labels: { type: "array", items: { type: "string" } },
          assignees: { type: "array", items: { type: "string" } },
        },
        required: ["owner", "repo", "issue_number"],
      },
    },
    {
      name: "list_issues",
      description: "List issues in a repository with optional filters",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          state: {
            type: "string",
            enum: ["open", "closed", "all"],
            description: "Filter by state. Default: open",
          },
          labels: {
            type: "string",
            description: "Comma-separated list of label names",
          },
          sort: { type: "string", enum: ["created", "updated", "comments"] },
          direction: { type: "string", enum: ["asc", "desc"] },
          per_page: {
            type: "number",
            description: "Results per page (max 100)",
          },
          page: { type: "number" },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "search_issues",
      description: "Search for issues across GitHub repositories",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "Search query (e.g. 'bug label:bug language:python is:open')",
          },
          sort: {
            type: "string",
            enum: ["comments", "reactions", "created", "updated"],
          },
          order: { type: "string", enum: ["asc", "desc"] },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["query"],
      },
    },
    {
      name: "add_issue_comment",
      description: "Add a comment to an issue or pull request",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          issue_number: { type: "number" },
          body: {
            type: "string",
            description: "The comment body text (supports Markdown)",
          },
        },
        required: ["owner", "repo", "issue_number", "body"],
      },
    },
    {
      name: "list_issue_comments",
      description: "List comments on an issue or pull request",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          issue_number: { type: "number" },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["owner", "repo", "issue_number"],
      },
    },
    {
      name: "add_label",
      description: "Add labels to an issue or pull request",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          issue_number: { type: "number" },
          labels: {
            type: "array",
            items: { type: "string" },
            description: "Array of label names to add",
          },
        },
        required: ["owner", "repo", "issue_number", "labels"],
      },
    },
    {
      name: "remove_label",
      description: "Remove a label from an issue or pull request",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          issue_number: { type: "number" },
          name: {
            type: "string",
            description: "The name of the label to remove",
          },
        },
        required: ["owner", "repo", "issue_number", "name"],
      },
    },
    // --- Pull Request Tools ---
    {
      name: "create_pull_request",
      description: "Create a pull request in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          title: { type: "string" },
          body: {
            type: "string",
            description: "The contents of the pull request.",
          },
          head: {
            type: "string",
            description:
              "The name of the branch where your changes are implemented.",
          },
          base: {
            type: "string",
            description:
              "The name of the branch you want the changes pulled into.",
          },
          draft: {
            type: "boolean",
            description: "Indicates whether the pull request is a draft.",
          },
        },
        required: ["owner", "repo", "title", "head", "base"],
      },
    },
    {
      name: "update_pull_request",
      description: "Update an existing pull request (title, body, state, base)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          pull_number: { type: "number" },
          title: { type: "string" },
          body: { type: "string" },
          state: { type: "string", enum: ["open", "closed"] },
          base: { type: "string" },
        },
        required: ["owner", "repo", "pull_number"],
      },
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
          merge_method: {
            type: "string",
            enum: ["merge", "squash", "rebase"],
            description: "The merge method to use. Default is 'merge'.",
          },
        },
        required: ["owner", "repo", "pull_number"],
      },
    },
    {
      name: "list_pull_requests",
      description: "List pull requests in a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          state: {
            type: "string",
            enum: ["open", "closed", "all"],
            description: "Filter by state. Default: open",
          },
          sort: {
            type: "string",
            enum: ["created", "updated", "popularity", "long-running"],
          },
          direction: { type: "string", enum: ["asc", "desc"] },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "list_pr_files",
      description: "List the files changed in a pull request",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          pull_number: { type: "number" },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["owner", "repo", "pull_number"],
      },
    },
    {
      name: "add_pr_review_comment",
      description:
        "Add a review comment to a pull request (inline comment on a specific file/line)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          pull_number: { type: "number" },
          body: { type: "string", description: "The comment body text" },
          commit_id: {
            type: "string",
            description: "SHA of the commit to comment on",
          },
          path: {
            type: "string",
            description: "The relative path of the file to comment on",
          },
          line: {
            type: "number",
            description: "The line number in the diff to comment on",
          },
          side: {
            type: "string",
            enum: ["LEFT", "RIGHT"],
            description: "Which side of the diff. Default: RIGHT",
          },
        },
        required: ["owner", "repo", "pull_number", "body", "commit_id", "path"],
      },
    },
    {
      name: "get_pr_comments",
      description: "List all review comments on a pull request",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          pull_number: { type: "number" },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["owner", "repo", "pull_number"],
      },
    },
    {
      name: "submit_pr_review",
      description:
        "Submit a review on a pull request (approve, request changes, or comment)",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          pull_number: { type: "number" },
          body: { type: "string", description: "The review body text" },
          event: {
            type: "string",
            enum: ["APPROVE", "REQUEST_CHANGES", "COMMENT"],
            description: "The review action to perform",
          },
        },
        required: ["owner", "repo", "pull_number", "event"],
      },
    },
  ];
}

export async function handleIssueTools(
  name: string,
  params: any,
  octokit: Octokit,
) {
  // --- Issue handlers ---
  if (name === "create_issue") {
    const { owner, repo, title, body, assignees, labels } = params;
    const { data } = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
      assignees,
      labels,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "issue_read") {
    const { owner, repo, issue_number } = params;
    const { data } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "update_issue") {
    const { owner, repo, issue_number, title, body, state, labels, assignees } =
      params;
    const { data } = await octokit.rest.issues.update({
      owner,
      repo,
      issue_number,
      title,
      body,
      state,
      labels,
      assignees,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_issues") {
    const { owner, repo, state, labels, sort, direction, per_page, page } =
      params;
    const { data } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state,
      labels,
      sort,
      direction,
      per_page,
      page,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "search_issues") {
    const { query, sort, order, per_page, page } = params;
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: query,
      sort,
      order,
      per_page,
      page,
    });
    return {
      content: [{ type: "text", text: JSON.stringify(data.items, null, 2) }],
    };
  }

  if (name === "add_issue_comment") {
    const { owner, repo, issue_number, body } = params;
    const { data } = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_issue_comments") {
    const { owner, repo, issue_number, per_page, page } = params;
    const { data } = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number,
      per_page,
      page,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "add_label") {
    const { owner, repo, issue_number, labels } = params;
    const { data } = await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number,
      labels,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "remove_label") {
    const { owner, repo, issue_number, name: labelName } = params;
    await octokit.rest.issues.removeLabel({
      owner,
      repo,
      issue_number,
      name: labelName,
    });
    return {
      content: [
        { type: "text", text: `Label "${labelName}" removed successfully.` },
      ],
    };
  }

  // --- PR handlers ---
  if (name === "create_pull_request") {
    const { owner, repo, title, body, head, base, draft } = params;
    const { data } = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      body,
      head,
      base,
      draft,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "update_pull_request") {
    const { owner, repo, pull_number, title, body, state, base } = params;
    const { data } = await octokit.rest.pulls.update({
      owner,
      repo,
      pull_number,
      title,
      body,
      state,
      base,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "merge_pull_request") {
    const {
      owner,
      repo,
      pull_number,
      commit_title,
      commit_message,
      merge_method,
    } = params;
    const { data } = await octokit.rest.pulls.merge({
      owner,
      repo,
      pull_number,
      commit_title,
      commit_message,
      merge_method: merge_method as any,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_pull_requests") {
    const { owner, repo, state, sort, direction, per_page, page } = params;
    const { data } = await octokit.rest.pulls.list({
      owner,
      repo,
      state,
      sort,
      direction,
      per_page,
      page,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_pr_files") {
    const { owner, repo, pull_number, per_page, page } = params;
    const { data } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number,
      per_page,
      page,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "add_pr_review_comment") {
    const { owner, repo, pull_number, body, commit_id, path, line, side } =
      params;
    const { data } = await octokit.rest.pulls.createReviewComment({
      owner,
      repo,
      pull_number,
      body,
      commit_id,
      path,
      line,
      side,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "get_pr_comments") {
    const { owner, repo, pull_number, per_page, page } = params;
    const { data } = await octokit.rest.pulls.listReviewComments({
      owner,
      repo,
      pull_number,
      per_page,
      page,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "submit_pr_review") {
    const { owner, repo, pull_number, body, event } = params;
    const { data } = await octokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number,
      body,
      event,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
