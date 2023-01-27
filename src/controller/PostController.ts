import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { InsertPostInputDTO } from "../model/postDTO";

export class PostController {

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: InsertPostInputDTO = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                authorId: req.body.authorId
            }
            const postBusiness = new PostBusiness()

            await postBusiness.createPost(input)

            res.status(201).send({message: "Post criado!"})

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    public getPost = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const input = { id };

            const postBusiness = new PostBusiness()

            const result = await postBusiness.getPost(input)

            res.status(200).send({result})
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }
}