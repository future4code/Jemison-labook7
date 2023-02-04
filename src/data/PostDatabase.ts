import { UserDatabase } from './UserDatabase';
import { authenticationData } from './../model/types';
import { CustomError } from "../error/CustomError";
import { InsertPostInputDTO } from "../model/postDTO";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private postTable = 'labook_posts'

    public insertPost = async (post: InsertPostInputDTO) => {
        try {
            PostDatabase.connection.initialize()
            await PostDatabase.connection(this.postTable)
            .insert(post)
        } catch (error: any) {
            throw new Error(error.message)
        } finally{
            console.log("conexão encerrada");
            PostDatabase.connection.destroy();
        }
    }

    public getAllPost = async () => {
        try {
            const allpost = await PostDatabase.connection(this.postTable)
            .select()
            return allpost
        } catch (error: any) {
            throw new CustomError (error.statusCode, error.message || error.sqlMessage)
        }
    }

    public getById = async (id: string) => {
        try {
            PostDatabase.connection.initialize()
            const result: any = await PostDatabase.connection(this.postTable)
            .select("*")
            .where({ id })

            return result
        } catch (error: any) {
            throw new Error (error.messaage)
        } 
        finally {
            console.log("conexão encerrada");
            PostDatabase.connection.destroy();
        }
    }

}
