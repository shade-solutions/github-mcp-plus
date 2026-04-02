import { Octokit } from "octokit";

export function registerEnterpriseAdminTools() {
  return [
    {
      name: "get_enterprise",
      description: "Get information for a specific enterprise",
      inputSchema: {
        type: "object",
        properties: {
          enterprise: { type: "string" },
        },
        required: ["enterprise"],
      },
    },
    {
      name: "list_enterprise_audit_log",
      description: "List audit log entries for an enterprise",
      inputSchema: {
        type: "object",
        properties: {
          enterprise: { type: "string" },
          phrase: { type: "string", description: "Search phrase" },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["enterprise"],
      },
    },
  ];
}

export async function handleEnterpriseAdminTools(
  name: string,
  params: any,
  octokit: Octokit,
) {
  if (name === "get_enterprise") {
    const { enterprise } = params;
    // Enterprise endpoints usually need a different structure in octokit or use orgs
    // For many enterprise accounts, 'orgs' is the base.
    // However, there is a dedicated 'enterpriseAdmin' category.
    const { data } = await (octokit.rest as any).enterpriseAdmin.getEnterprise({ enterprise });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_enterprise_audit_log") {
    const { enterprise, phrase, per_page, page } = params;
    const { data } = await (octokit.rest as any).enterpriseAdmin.listAuditLog({ enterprise, phrase, per_page, page });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  return null;
}
