import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { handlers } from "../apis/main";
import configuration from "../configuration";
import { APIHandler, Injection } from "./types";
import PrismaService from "./prisma-service";
import RedisService from "./redis-service";

export async function startServer(options: {
  defaultAuthSubjects: string[];
  unauthorizedSubjects: string[];
  customAuthSubjects: Array<{
    authSubjects: string[];
    subjects: string[];
  }>;
}) {
  const redisService = configuration.redis.url
    ? await RedisService(configuration.redis.url)
    : undefined;

  const prismaService = configuration.postgres.url
    ? PrismaService(configuration.postgres.url)
    : undefined;

  const injection: Injection = {
    redisService,
    prismaService,
  };

  const app = express();

  app.use(cors({ credentials: true, origin: true }));
  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", (_: Request, response: Response) => {
    response.status(200).send("ok");
  });

  app.post("/api/:subject", async (request: Request, response: Response) => {
    try {
      const subject = request.params.subject;
      if (!subject) throw new Error("invalid subject");

      const { unauthorizedSubjects, customAuthSubjects, defaultAuthSubjects } =
        options;

      if (!unauthorizedSubjects.includes(subject)) {
        const custom = customAuthSubjects.find(({ subjects }) =>
          subjects.includes(subject)
        );

        const authSubjects = custom ? custom.authSubjects : defaultAuthSubjects;

        for (const authSubject of authSubjects) {
          await processHandler({
            subject: authSubject,
            injection,
            request,
          });
        }
      }

      const result = await processHandler({
        subject,
        injection,
        request,
      });

      response.status(result.code).send(result.body);
    } catch (error) {
      response.status(error.code || 500).send(error);
    }
  });

  app.listen(configuration.port, () => {
    console.log(`App listening on port ${configuration.port}`);
  });

  process
    .on("unhandledRejection", console.error)
    .on("uncaughtException", console.error)
    .on("beforeExit", () =>
      Promise.allSettled([
        redisService?.dispose(),
        prismaService?.$disconnect(),
      ])
    );
}

async function processHandler(params: {
  subject: string;
  injection: Injection;
  request: Request;
}) {
  const { subject, injection, request } = params;
  if (!subject) throw new Error("invalid subject");

  const handler = handlers.find((h) => h.subject === subject) as APIHandler;
  if (!handler) throw new Error("subject not found");

  const validateResult = await handler.validate(
    {
      headers: request.headers,
      body: request.body,
    },
    injection
  );

  request.headers = { ...request.headers, ...(validateResult.headers || {}) };

  const authorizeResult = await handler.authorize(
    {
      headers: request.headers,
      body: request.body,
    },
    injection
  );

  request.headers = { ...request.headers, ...(authorizeResult.headers || {}) };

  const result = await handler.handle(
    {
      headers: request.headers,
      body: request.body,
    },
    injection
  );

  return result;
}
