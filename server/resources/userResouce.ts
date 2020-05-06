import { Request, Response } from "express";
import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";
import User, { IUser } from "../schema/user";

export const userRoutes = express.Router();

userRoutes.get("/", _findAll);
userRoutes.get("/:id", _findById);
userRoutes.post("/", _save);
userRoutes.delete("/:id", _delete);

async function _findAll(req: Request, res: Response) {
  try {
    const users = await User.find<IUser>({});
    if (!users)
      return res.status(401).json({
        text: "???",
      });
    return res.status(200).json(_.map(users, (user: IUser) => _mapUser(user)));
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

function _mapUser(user: IUser) {
  return _.pick(user, ["userId", "email", "createdAt"]);
}

async function _findById(req: Request, res: Response) {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user)
      return res.status(401).json({
        text: `Unknown user id: ${req.params.id}`,
      });
    return res.status(200).json(_.pick(user, ["userId", "email", "createdAt"]));
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function _save(req: Request, res: Response) {
  try {
    const date = new Date();
    const userId = uuidv4();

    const user = new User({
      userId: userId,
      ...req.body,
      createdAt: date,
    });
    const invoiceSaved = await user.save();

    return res.status(200).json(userId);
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}

async function _delete(req: Request, res: Response) {
  try {
    User.deleteOne({ userId: req.params.id });
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}
