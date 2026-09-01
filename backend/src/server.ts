import { buildApp } from "./app.js";
import logger from "./lib/logger.js";
import "dotenv/config";

const app = buildApp();

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    logger.info(`Anoyt server running on port ${PORT}`);
});