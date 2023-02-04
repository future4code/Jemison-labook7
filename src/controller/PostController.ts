import { CustomError } from './../error/CustomError';
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

    public getById = async (req: Request, res: Response): Promise<void> => {
        try {
            // const postBusiness = new PostBusiness()
            const input = {
                id: req.body.id
            }
            await this.postBusiness.getById(input)
        }catch (error: any) {
            throw new CustomError(error.statusCode || 400, error.message || error.sqlMessage)
        }
    }

    public geAllPost = async (req: Request, res: Response) => {
        try {
            const allPosts = await this.postBusiness.getAllPosts()
            res.status(200).send(allPosts)
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }
}