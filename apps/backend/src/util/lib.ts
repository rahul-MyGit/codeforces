import { Response } from "express";

export function invalidInputs(res: Response) {
  return res.status(400).json({
    message: "invali inputs"
  });
}


export function unauthorized(res: Response) {
  return res.status(403).json({
    message: "unauthorized"
  });
}


export function notAdmin(res: Response) {
  return res.status(403).json({
    message: "not an admin"
  });
}

export function noProblemId(res: Response) {
  return res.status(404).json({
    message: "no problem id provided"
  });
}
