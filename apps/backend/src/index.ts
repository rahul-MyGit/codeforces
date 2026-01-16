import express, { Request, Response } from "express";
import cors from "cors";
// import { adminProblemRouter } from "./router/adminProblemsRouter";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./util/auth";

const app = express();
const port = process.env.PORT || 3001;

/*
cors({
  origin: "http://localhost:3000", // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
})
 * */

const corsMiddleware = cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

app.use(corsMiddleware);
app.all('/api/auth/{*any}', corsMiddleware, toNodeHandler(auth));

app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      userId?: String
    }
  }
}

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});


app.post("/api/auth/sign-up/email", (req: Request, res: Response) => {

  console.log("hi");
  res.json({
    msg: "hi"
  })
});

// app.use("/api/auth", authRouter);

// app.use("/api/auth", authRouter);
//app.use("/api/admin/problems", adminProblemRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
