import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostInputDTO } from "../model/postDTO";
import { authenticationData } from "../model/types";


export class PostController {

    private postBusiness = new PostBusiness()

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: PostInputDTO = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                authorId: req.body.authorId
            }

            await this.postBusiness.createPost(input)

            res.status(201).send({message: "Post criado!"})

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    public getPost = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const input: authenticationData = { id };

            const result = await this.postBusiness.getPost(input)

            res.status(200).send({result})
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }
}