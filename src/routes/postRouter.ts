import express from "express";
import { PostController } from "../controller/PostController"

const postController = new PostController();

export const postRouter = express.Router();

postRouter.post("/create", postController.createPost)
postRouter.get("/get", postController.getPost)