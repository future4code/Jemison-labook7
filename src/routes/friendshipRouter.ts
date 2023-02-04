import express from "express";
import { FriendshipController } from "../controller/FriendshipController";

const friendshipController = new FriendshipController()

export const friendshipRouter = express.Router();

friendshipRouter.post("/create", friendshipController.addFriend)
