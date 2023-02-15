import { user } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private userTable = 'labook_users'

    public insertUser = async (user: user) => {
        try {
            UserDatabase.connection.initialize()
            await UserDatabase.connection.insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }).into(this.userTable)

        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            console.log("conexão encerrada!");
            UserDatabase.connection.destroy();
        }
    }

    public getById = async (id: string) => {
        try {
            await UserDatabase.connection(this.userTable)
            .select()
            .where({ id })

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}