import { CustomError } from "../error/CustomError";
import { post } from "../model/post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private postTable = 'labook_posts'

    public insertPost = async (post: post) => {
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

    public getPost = async (id: string) => {
        try {
            PostDatabase.connection.initialize()
            const result = await PostDatabase.connection(this.postTable)
            .select()
            .where({id})
            .orderBy('asc')

            return result;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message || error.sqlMessage)
        }
    }

}
