import jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) => {
  return jwt.sign({ email }, process.env.SECRET!, { expiresIn: "7d" });
};
