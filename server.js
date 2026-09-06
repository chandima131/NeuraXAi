import path from "node:path";
import { fileURLToPath } from "node:url";
import { startProdServer } from "vinext/server/prod-server";

const appDirectory = path.dirname(fileURLToPath(import.meta.url));
const port = Number.parseInt(process.env.PORT || "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port.");
}

startProdServer({
  host: "0.0.0.0",
  port,
  outDir: path.join(appDirectory, "dist"),
}).catch((error) => {
  console.error("Unable to start the NeuraX server.", error);
  process.exitCode = 1;
});
