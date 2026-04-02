import { Octokit } from "octokit";

export function registerUserOrgTools() {
  return [
    {
      name: "get_me",
      description: "Get the authenticated user",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "update_authenticated_user",
      description: "Update the authenticated user's profile",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          blog: { type: "string" },
          company: { type: "string" },
          location: { type: "string" },
          hireable: { type: "boolean" },
          bio: { type: "string" },
        },
      },
    },
    {
      name: "list_emails_for_authenticated_user",
      description: "List email addresses for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          per_page: { type: "number" },
          page: { type: "number" },
        },
      },
    },
    {
      name: "follow_user",
      description: "Follow a user",
      inputSchema: {
        type: "object",
        properties: {
          username: { type: "string" },
        },
        required: ["username"],
      },
    },
    {
      name: "unfollow_user",
      description: "Unfollow a user",
      inputSchema: {
        type: "object",
        properties: {
          username: { type: "string" },
        },
        required: ["username"],
      },
    },
    {
      name: "list_orgs_for_authenticated_user",
      description: "List organizations the authenticated user is a member of",
      inputSchema: {
        type: "object",
        properties: {
          per_page: { type: "number" },
          page: { type: "number" },
        },
      },
    },
    {
      name: "get_org",
      description: "Get an organization's profile",
      inputSchema: {
        type: "object",
        properties: {
          org: { type: "string" },
        },
        required: ["org"],
      },
    },
    {
      name: "list_org_members",
      description: "List members of an organization",
      inputSchema: {
        type: "object",
        properties: {
          org: { type: "string" },
          role: { type: "string", enum: ["all", "admin", "member"] },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["org"],
      },
    },
    {
      name: "list_org_teams",
      description: "List teams in an organization",
      inputSchema: {
        type: "object",
        properties: {
          org: { type: "string" },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["org"],
      },
    },
  ];
}

export async function handleUserOrgTools(
  name: string,
  params: any,
  octokit: Octokit,
) {
  if (name === "get_me") {
    const { data } = await octokit.rest.users.getAuthenticated();
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "update_authenticated_user") {
    const { data } = await octokit.rest.users.updateAuthenticated(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_emails_for_authenticated_user") {
    const { data } = await octokit.rest.users.listEmailsForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "follow_user") {
    const { username } = params;
    await octokit.rest.users.follow({ username });
    return { content: [{ type: "text", text: `Successfully followed ${username}` }] };
  }

  if (name === "unfollow_user") {
    const { username } = params;
    await octokit.rest.users.unfollow({ username });
    return { content: [{ type: "text", text: `Successfully unfollowed ${username}` }] };
  }

  if (name === "list_orgs_for_authenticated_user") {
    const { data } = await octokit.rest.orgs.listForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "get_org") {
    const { org } = params;
    const { data } = await octokit.rest.orgs.get({ org });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_org_members") {
    const { org, role, per_page, page } = params;
    const { data } = await octokit.rest.orgs.listMembers({ org, role, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_org_teams") {
    const { org, per_page, page } = params;
    const { data } = await octokit.rest.teams.list({ org, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
