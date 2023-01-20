export default {
  PORT: 5000,
  dbURI: "mongodb://localhost:27017/SI",
  saltWorkFactor: 10,
  privateKey: "key",
  redisURL: 6379,
  Cookie: {
    ACCESS_TOKEN_TTL: 1,
  },
  admin: {
    email: "temp@gmail.com",
    password: "password@123",
  },
};
