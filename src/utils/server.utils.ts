import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(CookieParser());
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://resumerise.vercel.app/"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  );

  return app;
}
