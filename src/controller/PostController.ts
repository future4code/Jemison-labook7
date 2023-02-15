import { CustomError } from './../error/CustomError';
import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostInputDTO } from "../model/postDTO";
import { post } from "../model/post";
import { authenticationData } from '../model/types';



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

    public getById = async (req:Request, res: Response) => {
        try {
            
            const { id } = req.params

            const result: any = await this.postBusiness.getById(id)
            
            let message = "Sucess"

            if(!result[0]) {
                res.statusCode = 404
                message = "Post not found"
                throw new Error (message)
            }

            const post: post = {
                id: result[0].id,
                photo: result[0].photo,
                description: result[0].description,
                type: result[0].type,
                createdAt: result[0].created_at,
                authorId: result[0].author_id,
            }
            res.status(200).send({ message, post })

        } catch (error: any) {
            // let message = error.sql.sqlMessage || error.message
            // res.statusCode = 400
            // res.send({ message })
            res.status(100).send(error.message)
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