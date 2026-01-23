import express from "express";
import cors from "cors";
import { adminProblemRouter } from "./router/adminProblemsRouter";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./util/auth";
import { userProblemRouter } from "./router/userProblemsRouter";
import { tagsRouter } from "./router/tagsRouter";
import { judge0Router } from "./router/judge0Router";
import { pubSubClient, redisClient } from "./redis/client";

const app = express();
const port = process.env.PORT || 3001;

declare global {
  namespace Express {
    interface Request {
      userId?: String
    }
  }
}


const corsMiddleware = cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

app.use(corsMiddleware);
app.all('/api/auth/{*any}', corsMiddleware, toNodeHandler(auth));

app.use(express.json());


app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});


app.use("/api/admin/problems", adminProblemRouter);
app.use("/api/user/problems", userProblemRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/judge0", judge0Router);

async function main() {
  await redisClient.connect();
  console.log("connected to redis client");
  await pubSubClient.connect();
  console.log("connected to pub sub client");
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}
main();
