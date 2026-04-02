import { Octokit } from "octokit";

export function registerKeysHooksTools() {
  return [
    {
      name: "list_public_ssh_keys_for_authenticated_user",
      description: "List public SSH keys for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          per_page: { type: "number" },
          page: { type: "number" },
        },
      },
    },
    {
      name: "add_public_ssh_key_for_authenticated_user",
      description: "Add a public SSH key for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string" },
          key: { type: "string" },
        },
        required: ["key"],
      },
    },
    {
      name: "list_gpg_keys_for_authenticated_user",
      description: "List GPG keys for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          per_page: { type: "number" },
          page: { type: "number" },
        },
      },
    },
    {
      name: "add_gpg_key_for_authenticated_user",
      description: "Add a GPG key for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          armored_public_key: { type: "string" },
        },
        required: ["armored_public_key"],
      },
    },
    {
      name: "list_repo_webhooks",
      description: "List webhooks for a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "create_repo_webhook",
      description: "Create a webhook for a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          name: { type: "string", description: "Default is 'web'" },
          config: {
            type: "object",
            properties: {
              url: { type: "string" },
              content_type: { type: "string" },
              secret: { type: "string" },
              insecure_ssl: { type: "string" },
            },
            required: ["url"],
          },
          events: { type: "array", items: { type: "string" } },
          active: { type: "boolean" },
        },
        required: ["owner", "repo", "config"],
      },
    },
  ];
}

export async function handleKeysHooksTools(
  name: string,
  params: any,
  octokit: Octokit,
) {
  if (name === "list_public_ssh_keys_for_authenticated_user") {
    const { data } = await octokit.rest.users.listPublicSshKeysForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "add_public_ssh_key_for_authenticated_user") {
    const { data } = await octokit.rest.users.createPublicSshKeyForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_gpg_keys_for_authenticated_user") {
    const { data } = await octokit.rest.users.listGpgKeysForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "add_gpg_key_for_authenticated_user") {
    const { data } = await octokit.rest.users.createGpgKeyForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_repo_webhooks") {
    const { owner, repo, per_page, page } = params;
    const { data } = await octokit.rest.repos.listWebhooks({ owner, repo, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "create_repo_webhook") {
    const { owner, repo, name: hookName, config, events, active } = params;
    const { data } = await octokit.rest.repos.createWebhook({
      owner,
      repo,
      name: hookName || "web",
      config,
      events,
      active,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
