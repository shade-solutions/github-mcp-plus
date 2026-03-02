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
    }
  ];
}

export async function handleRepositoryTools(name: string, params: any, octokit: Octokit) {
  if (name === "get_file_contents") {
    const { owner, repo, path, branch } = params;
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    });
    
    // If it's a file, decode the content
    if (!Array.isArray(data) && data.type === 'file' && data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf8');
      return { content: [{ type: "text", text: content }] };
    }
    
    // Otherwise return directory listing
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "create_or_update_file") {
    const { owner, repo, path, message, content, sha, branch } = params;
    const { data } = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch
    });
    return { content: [{ type: "text", text: JSON.stringify(data.commit, null, 2) }] };
  }

  if (name === "search_repositories") {
    const { query, page, perPage } = params;
    const { data } = await octokit.rest.search.repos({
      q: query,
      page,
      per_page: perPage
    });
    return { content: [{ type: "text", text: JSON.stringify(data.items, null, 2) }] };
  }

  return null;
}
