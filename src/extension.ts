import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log("GitHub MCP Plus is now active!");

  // Register the MCP server definition provider
  // This uses the native VS Code LM (Language Model) API introduced in v1.99
  if (
    (vscode as any).lm &&
    (vscode as any).lm.registerMcpServerDefinitionProvider
  ) {
    context.subscriptions.push(
      (vscode as any).lm.registerMcpServerDefinitionProvider(
        "github-mcp-plus-provider",
        {
          provideMcpServerDefinitions: (token: vscode.CancellationToken) => {
            const serverPath = path.join(
              context.extensionPath,
              "build",
              "index.js",
            );

            const definition: any = {
              id: "github-mcp-plus",
              name: "GitHub MCP Plus",
              transport: {
                type: "stdio",
                command: "node",
                args: [serverPath],
                env: {
                  // Pass through existing environment or set defaults
                  GITHUB_PERSONAL_ACCESS_TOKEN:
                    process.env.GITHUB_PERSONAL_ACCESS_TOKEN || "",
                },
              },
            };

            return [definition];
          },
        },
      ),
    );
  }
}

export function deactivate() {}
