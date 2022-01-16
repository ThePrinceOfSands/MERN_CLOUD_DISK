import type { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/User";
import { genetateJWT } from "../helpers/generateJWT";

class AuthController {
  async registration(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "The email is not corrected" });
    }

    const hashPassword = bcryptjs.hashSync(password, Number(process.env.saltHash));
    const user = new User({ email, password: hashPassword });

    await user.save();

    return res.status(200).json({ message: "The user was successfully registered" });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "The user is not been" });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "The password had not corrected" });
    }

    const jwt = genetateJWT(user._id);

    return res.status(200).json({ jwt });
  }
}

export default new AuthController();