import Redis from "ioredis";
import config from "config";
import log from "../logger";
const redisClient = new Redis(config.get("redisURL"));

redisClient.once("connect", (err) => {
  log.info("Connected to redis");
});

export const setRedisKey = async (
  key: string,
  value: any,
  timeLimit?: number
) => {
  if (!timeLimit) {
    return await redisClient.set(key, value);
  } else {
    return await redisClient.set(key, value, "EX", timeLimit);
  }
};

export const getRedisKey = async (key: string) => {
  return await redisClient.get(key);
};

export const deleteRedisKey = async (key: string) => {
  return await redisClient.del(key);
};
