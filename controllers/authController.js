import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

/* REGISTER */

export const register =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
        phone,
        department,
      } = req.body;

      /* CHECK USER */

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      /* HASH PASSWORD */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      /* CREATE USER */

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role:
            role || "user",

          phone,

          department,

          employeeId:
            `EMP-${Date.now()}`,
        });

      /* TOKEN */

      const token =
        jwt.sign(

          {
            id: user._id,
            role: user.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      /* RESPONSE */

      res.json({

        token,

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,

          phone:
            user.phone,

          department:
            user.department,

          employeeId:
            user.employeeId,
        },
      });

    } catch (error) {

      res
        .status(500)
        .json({
          message:
            error.message,
        });
    }
  };

/* LOGIN */

export const login =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      /* FIND USER */

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(400)
          .json({
            message:
              "User not found",
          });
      }

      /* CHECK PASSWORD */

      const match =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!match) {

        return res
          .status(400)
          .json({
            message:
              "Wrong password",
          });
      }

      /* LAST LOGIN */

      user.lastLogin =
        new Date();

      await user.save();

      /* TOKEN */

      const token =
        jwt.sign(

          {
            id: user._id,
            role: user.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      /* RESPONSE */

      res.json({

        token,

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,

          phone:
            user.phone,

          department:
            user.department,

          profileImage:
            user.profileImage,

          status:
            user.status,
        },
      });

    } catch (error) {

      res
        .status(500)
        .json({
          message:
            error.message,
        });
    }
  };