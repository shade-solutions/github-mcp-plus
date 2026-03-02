import { spawn } from "child_process";

const server = spawn("node", ["./build/index.js"], {
  env: { ...process.env, GITHUB_PERSONAL_ACCESS_TOKEN: "dummy_token" },
  stdio: ["pipe", "pipe", "pipe"]
});

server.stderr.on("data", (data) => {
  console.log(`[STDERR]: ${data.toString()}`);
});

server.stdout.on("data", (data) => {
  console.log(`[STDOUT JSONRPC RECV]: ${data.toString()}`);
});

// JSON-RPC Init Request
const initReq = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" }
  }
};

server.stdin.write(JSON.stringify(initReq) + "\n");

setTimeout(() => {
  const toolsReq = {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
    params: {}
  };
  server.stdin.write(JSON.stringify(toolsReq) + "\n");
}, 1000);

setTimeout(() => {
  server.kill();
  console.log("Test finished.");
}, 2000);
