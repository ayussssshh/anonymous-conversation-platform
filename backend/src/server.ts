
import "dotenv/config";

import { createServer } from "node:http";
import { buildApp } from "./app.js";
import logger from "./lib/logger.js";
import { initializeWebSocket } from "./websocket/index.js";

const app = buildApp();

const server = createServer(app);

initializeWebSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    logger.info(`Anoyt server running on port ${PORT}`);
});

