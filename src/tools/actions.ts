import { Octokit } from "octokit";

export function registerActionTools() {
  return [
    {
      name: "actions_list",
      description: "Lists all GitHub Actions workflows in a repository",
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
      name: "actions_run_trigger",
      description: "Trigger a GitHub Actions workflow run",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          workflow_id: { type: "string", description: "The ID of the workflow or the workflow file name." },
          ref: { type: "string", description: "The git reference for the workflow (e.g. branch name or tag)." },
          inputs: { type: "object", description: "Input keys and values configured in the workflow file." }
        },
        required: ["owner", "repo", "workflow_id", "ref"]
      }
    },
    {
      name: "list_check_runs_for_ref",
      description: "List check runs for a specific reference (branch, SHA, or tag) to see CI/CD status",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string" },
          repo: { type: "string" },
          ref: { type: "string", description: "The reference to check (SHA, branch, or tag)" }
        },
        required: ["owner", "repo", "ref"]
      }
    }
  ];
}

export async function handleActionTools(name: string, params: any, octokit: Octokit) {
  if (name === "actions_list") {
    const { owner, repo } = params;
    const { data } = await octokit.rest.actions.listRepoWorkflows({
      owner,
      repo
    });
    return { content: [{ type: "text", text: JSON.stringify(data.workflows, null, 2) }] };
  }

  if (name === "actions_run_trigger") {
    const { owner, repo, workflow_id, ref, inputs } = params;
    const { data } = await octokit.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id,
      ref,
      inputs
    });
    return { content: [{ type: "text", text: `Successfully triggered workflow. API returned empty response: ${JSON.stringify(data)}` }] };
  }

  if (name === "list_check_runs_for_ref") {
    const { owner, repo, ref } = params;
    const { data } = await octokit.rest.checks.listForRef({
      owner,
      repo,
      ref
    });
    return { content: [{ type: "text", text: JSON.stringify(data.check_runs, null, 2) }] };
  }

  return null;
}
