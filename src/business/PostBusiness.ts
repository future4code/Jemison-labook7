import { PostDatabase } from './../data/PostDatabase';
import { generationId } from './../services/idGenerator';
import { CustomError } from "../error/CustomError";
import { InsertPostInputDTO } from "../model/postDTO";
import { POST_TYPES } from '../model/types';
import { InvalidInput } from '../error/PostError';


export class PostBusiness {
    public createPost = async (input: InsertPostInputDTO) => {
        
        try{
            const postDatabase = new PostDatabase()
            const { photo, description, type, authorId } = input

            if (!photo || !description || !type) {
                throw new CustomError(400, 'Preencha os campos, "photo", "desccription" e "type"')
            }

            const id: string = generationId()
            

            await postDatabase.insertPost({
                id,
                photo,
                description,
                type,
                createdAt: new Date(),
                authorId
            })
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    //get post{id}
    public getPost = async (input: any) => {
        try {
            const postDatabase = new PostDatabase()
            if (!input.id) {
                throw new InvalidInput();
            }

            const result = await postDatabase.getPost(input.id);
            return result
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}