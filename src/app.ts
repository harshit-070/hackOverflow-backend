import { createServer } from "./utils/server.utils";
import config from "config";
import log from "./logger";
import routes from "./routes";
import { connect } from "./database/database";
import "./utils/redis.utils";
const app = createServer();

const port = config.get<number>("PORT");

app.listen(port, () => {
  log.info(`Listening on localhost ${port}...`);
  connect();
  routes(app);
});
