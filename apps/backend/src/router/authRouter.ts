/*
import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import prisma from "@repo/database/client"
import bcrypt from "bcrypt";
import { OtpTemplate } from "@repo/email/template/OtpTemplate";
import { otpSchema, signinSchema, signupSchema } from "@repo/common/zodTypes";

import { authMiddleware } from "../middleware/authMiddleware";
import { sendEmail } from "@repo/email/mail";
export const authRouter: Router = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "invalid inputs"
    })
  }
  const { email, username, password } = parsedData.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userExists = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (userExists) {
    return res.status(403).json({
      message: "user already exists"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  let otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 1);

  let user;
  if (email == "nagmanipd3@gmail.com") { // add more admins 
    user = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        username,
        otp: otp,
        isVerified: false,
        otpExpiry: otpExpiry,
      }
    })
  } else {
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        isVerified: false,
        otp: otp,
        otpExpiry: otpExpiry
      }
    });
  }
  const response = await sendEmail({
    to: "nagmanipd3@gmail.com",
    variant: "primary",
    subject: "otp for signup",
    react: OtpTemplate({
      otp: "123456"
    })
  });
  console.log("response", response);

  res.json({
    message: "Email sent , please verify with otp",
    userId: user.id,
  });
});


authRouter.post("/signin", async (req: Request, res: Response) => {
  const parsedData = signinSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "invalid inputs"
    })
  }
  const { email, password } = parsedData.data;

  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  if (!user) {
    return res.status(404).json({
      message: "user doesn't exist"
    });
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(403).json({
      message: "invalid password"
    });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "nagmani", { expiresIn: "15d" });
  res.cookie("token", token);
  res.json({
    message: "signin successful",
    token
  });
});

authRouter.post("/verify-otp/:userId", async (req: Request, res: Response) => {
  const parsedData = otpSchema.safeParse(req.body);
  const userId = req.params.userId as string;

  if (!parsedData.success || !userId) {
    return res.status(400).json({
      message: "invalid inputs"
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  });
  if (user?.otp != parsedData.data.otp) {
    return res.status(403).json({
      message: "wrong otp"
    });
  }

  if (new Date() > user.otpExpiry) {
    return res.status(410).json({
      message: "you are late"
    });
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      isVerified: true
    }
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "nagmani", { expiresIn: "15d" });
  res.cookie("token", token);
  res.json({
    message: "correct otp",
    token
  });
});

authRouter.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId as string;
  if (!userId) {
    return res.status(403).json({
      message: "invalid auth"
    });
  };

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  });
  if (!user) {
    return res.status(404).json({
      message: "user not found"
    });
  }
  res.json({
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl
  });
});

/*
authRouter.post("/forgot-password-request", async (req: Request, res: Response) => {
  const parsedData = frogotPasswordSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "invalid inputs"
    })
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  await sendEmail(otp, parsedData.data.email, "FORGOT_PASSWORD");
});
  */
