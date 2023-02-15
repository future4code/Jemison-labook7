import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { InvalidEmail, InvalidPassaword } from "../error/UserError";
import { UserInputDTO } from "../model/userDTO";
import { generationId } from "../services/idGenerator";

export class UserBusiness {
    public createUser = async (input: UserInputDTO) => {

        try{
            const userDatabase = new UserDatabase()
            const { name, email, password } = input

            if (!name || !email || !password) {
                throw new CustomError(400, 'Preencha os campos "name", "email" e "password"')
            }

            if(!email.includes("@")) {
                throw new InvalidEmail()
             }
 
             if(password.length <= 6) {
                throw new InvalidPassaword()
             }

             const id: string = generationId()

             await userDatabase.insertUser({
                id,
                name,
                email,
                password
             })

        }catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}