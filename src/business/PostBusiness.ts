import { PostDatabase } from './../data/PostDatabase';
import { generationId } from './../services/idGenerator';
import { CustomError } from "../error/CustomError";
import { InsertPostInputDTO, PostInputDTO } from "../model/postDTO";
import { authenticationData, POST_TYPES } from '../model/types';
import { InvalidInput } from '../error/PostError';


export class PostBusiness {
    private postDatabase = new PostDatabase()
    public createPost = async (input: PostInputDTO) => {
        
        try{
            const { photo, description, type, authorId } = input

            if (!photo || !description || !type) {
                throw new CustomError(400, 'Preencha os campos, "photo", "desccription" e "type"')
            }

            const id: string = generationId()
            

            await this.postDatabase.insertPost({
                id,
                photo,
                description,
                type,
                created_at: new Date(),
                author_id: authorId
            })
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    //get post{id}
    public getPost = async (input: authenticationData) => {
        try {
            if (!input.id) {
                throw new InvalidInput();
            }

            const result = await this.postDatabase.getPost(input.id);
            return result
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message || error.sqlMessage)
        }
    }
}