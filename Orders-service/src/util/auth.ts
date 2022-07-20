const jwt = require("jsonwebtoken");
import {Request,Response, NextFunction } from "express";
class authManager {
  async verifyToken(req:Request, res:Response, next:NextFunction) {
    try {
      // Gather the jwt access token from the request header
      const authHeader = await req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null)
        return res.status(401).json({ message: "No token provided!" }); // if there isn't any token

      jwt.verify(token, process.env.SECRET_TOKEN, (err:any, user:any) => {
        console.log(err);
        if (err)
          return res.status(403).json({ success: false, msg: "Unauthorized." });
        req.body.user = user;
        next(); // pass the execution off to whatever request the client intended
      });
    } catch (error) {
      return res.status(401).json({ message: "Your token has expired." });
    }
  }
}
export default new authManager();
