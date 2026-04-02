import { Octokit } from "octokit";

export function registerDevOpsTools() {
  return [
    {
      name: "list_deployments",
      description: "List deployments for a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          sha: { type: "string" },
          ref: { type: "string" },
          task: { type: "string" },
          environment: { type: "string" },
          per_page: { type: "number" },
          page: { type: "number" },
        },
        required: ["owner", "repo"],
      },
    },
    {
      name: "create_deployment",
      description: "Create a deployment for a repository",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          ref: { type: "string", description: "The ref to deploy. This can be a branch, tag, or SHA." },
          task: { type: "string" },
          auto_merge: { type: "boolean" },
          required_contexts: { type: "array", items: { type: "string" } },
          payload: { type: "object" },
          environment: { type: "string" },
          description: { type: "string" },
          transient_environment: { type: "boolean" },
          production_environment: { type: "boolean" },
        },
        required: ["owner", "repo", "ref"],
      },
    },
    {
      name: "list_packages_for_org",
      description: "List packages for an organization",
      inputSchema: {
        type: "object",
        properties: {
          org: { type: "string" },
          package_type: { type: "string", enum: ["npm", "maven", "rubygems", "docker", "nuget", "container"] },
          visibility: { type: "string", enum: ["public", "private", "internal"] },
        },
        required: ["org", "package_type"],
      },
    },
    {
      name: "list_codespaces_for_authenticated_user",
      description: "List codespaces for the authenticated user",
      inputSchema: {
        type: "object",
        properties: {
          per_page: { type: "number" },
          page: { type: "number" },
          repository_id: { type: "number" },
        },
      },
    },
  ];
}

export async function handleDevOpsTools(
  name: string,
  params: any,
  octokit: Octokit,
) {
  if (name === "list_deployments") {
    const { data } = await octokit.rest.repos.listDeployments(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "create_deployment") {
    const { data } = await octokit.rest.repos.createDeployment(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_packages_for_org") {
    // Corrected method name to listPackagesForOrganization
    const { data } = await (octokit.rest.packages as any).listPackagesForOrganization(params);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "list_codespaces_for_authenticated_user") {
    const { data } = await (octokit.rest.codespaces as any).listForAuthenticatedUser(params);
    return { content: [{ type: "text", text: JSON.stringify(data.codespaces, null, 2) }] };
  }

  return null;
}
