import { spawn } from "child_process";

const server = spawn("npx", ["-y", "github-mcp-plus"], {
  env: { ...process.env, GITHUB_PERSONAL_ACCESS_TOKEN: "gh_abCdEfGhIjKlMnOpQrStUvWxYz" },
  stdio: ["pipe", "pipe", "pipe"]
});

server.stderr.on("data", (data) => {
  // console.error(`[STDERR]: ${data.toString()}`);
});

let buffer = "";
server.stdout.on("data", (data) => {
  buffer += data.toString();
  const messages = buffer.split('\n');
  buffer = messages.pop() || "";
  for (const msg of messages) {
    if (!msg.trim()) continue;
    try {
      const parsed = JSON.parse(msg);
      if (parsed.id === 1) {
        // initialized, now call get_me
        server.stdin.write(JSON.stringify({
          jsonrpc: "2.0",
          id: 2,
          method: "tools/call",
          params: { name: "get_me", arguments: {} }
        }) + "\n");
      } else if (parsed.id === 2) {
        console.log("PROFILE DATA FROM MCP:");
        console.log(parsed.result.content[0].text);
        server.kill();
        process.exit(0);
      }
    } catch(e) {}
  }
});

server.stdin.write(JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test-client", version: "1.0.0" } }
}) + "\n");

server.stdin.write(JSON.stringify({
  jsonrpc: "2.0",
  method: "notifications/initialized"
}) + "\n");
