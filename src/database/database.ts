import config from "config";
import mongoose from "mongoose";
import log from "../logger";

export function connect() {
  const dbURI = config.get<string>("dbURI");

  mongoose
    .connect(dbURI)
    .then(() => {
      log.info("Connected to database");
    })
    .catch((e) => {
      log.error(`Error in Connecting to database : ${e} `);
    });
}
