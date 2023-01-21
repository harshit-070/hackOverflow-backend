"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: 5000,
    dbURI: "mongodb+srv://hackoverflow:hackoverflow@cluster0.6ecoz.mongodb.net/?retryWrites=true&w=majority",
    saltWorkFactor: 10,
    privateKey: "key",
    redisURL: "redis://default:n3feiOxRCQHJOOAjQ2VlMhbNQcycHv2p@redis-10072.c305.ap-south-1-1.ec2.cloud.redislabs.com:10072",
    Cookie: {
        ACCESS_TOKEN_TTL: 1,
    },
    admin: {
        email: "temp@gmail.com",
        password: "password@123",
    },
    GOOGLE: {
        CLIENT_ID: "563371260045-mf1vovudj6i2r6ns08ptgjp52n6v8ecs.apps.googleusercontent.com",
        CLIENT_SECRET: "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",
    },
    GITHUB: {
        CLIENT_ID: "bd0d304c6869e1c67ea4",
        CLIENT_SECRET: "199efeb0519b89d9d6e758fadfc508dce859762d",
        REDIRECT: process.env.GITHUB_REDIRECT || "http://localhost:3000/github/auth",
    },
    AWS: {
        FROM_EMAIL: "2020ume0200@iitjammu.ac.in",
        EMAIL_ACCESS_KEY: "AKIAVGBHQPZOOVT6VZQN",
        EMAIL_SECRET_KEY: "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",
        EMAIL_REGION: "ap-south-1",
    },
};
