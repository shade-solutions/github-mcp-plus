import { Octokit } from "octokit";

export function registerMiscTools() {
  return [
    {
      name: "list_notifications_for_authenticated_user",
      description: "List notifications for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          all: { type: "boolean", description: "If true, show notifications marked as read." },
          participating: { type: "boolean", description: "If true, only show notifications in which the user is directly participating or mentioned." },
          since: { type: "string", description: "Only show notifications updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ." },
          before: { type: "string", description: "Only show notifications updated before the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ." },
        },
      },
    },
    {
      name: "list_code_scanning_alerts_for_repo",
      description: "List code scanning alerts for a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          state: { type: "string", enum: ["open", "closed", "dismissed", "fixed"] },
          ref: { type: "string", description: "The full Git reference, for example refs/heads/main." },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "list_repo_invitations",
      description: "List invitations for a repository",
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
  ];
}

export async function handleMiscTools(
  name: string,
  params: any,
  octokit: Octokit,
) {
  if (name === "list_notifications_for_authenticated_user") {
    const { data } = await octokit.rest.activity.listNotificationsForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_code_scanning_alerts_for_repo") {
    const { owner, repo, state, ref } = params;
    const { data } = await octokit.rest.codeScanning.listAlertsForRepo({ owner, repo, state, ref });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_repo_invitations") {
    const { owner, repo, per_page, page } = params;
    const { data } = await octokit.rest.repos.listInvitations({ owner, repo, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
