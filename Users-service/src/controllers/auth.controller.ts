import User from "../models/user";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

class Auth {
  //Register
  async register(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        res.json({ success: false, msg: "Please pass username and password." });
      } else {
        var newUser = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        });
        // save the user
        if (newUser) {
          const user = await newUser.save();
          const token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, {
            expiresIn: "10m",
          });
          // return the information including token as JSON
          return res.json({
            success: true,
            msg: " Costumer is Created successfully.",
            token: token,
          });
        }
      }
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: "Costumer  Email already use" });
    }
  }
  //Login
  async login(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        res.json({ success: false, msg: "Please pass username and password." });
      } else {
        User.findOne(
          {
            email: req.body.email,
          },
          (err: any, user: any) => {
            if (err) throw err;
            if (!user) {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. User not found.",
              });
            } else {
              // check if password matches
              user.comparePassword(
                req.body.password,
                (err: any, isMatch: any) => {
                  if (isMatch && !err) {
                    // if user is found and password is right create a token
                    const token = jwt.sign(
                      user.toJSON(),
                      process.env.SECRET_TOKEN,
                      {
                        expiresIn: "10m",
                      }
                    );
                    // return the information including token as JSON
                    return res.json({
                      success: true,
                      msg: "Successful login",
                      token: token,
                    });
                  } else {
                    return res.status(422).send({
                      success: false,
                      msg: "Authentication failed. Wrong password.",
                    });
                  }
                }
              );
            }
          }
        );
      }
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}

export default new Auth();
