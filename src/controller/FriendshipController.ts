import { Request, Response } from "express";
import { FriendshipBusiness } from "../business/FriendshipBusiness";
import { friendshipDTO } from "../model/friendshipDTO";

export class FriendshipController {

    private friendshipBussines = new FriendshipBusiness()

    public addFriend = async ( req: Request, res: Response) => {
        try {
            const input: friendshipDTO = {
                user: req.body.user,
                friendship: req.body.friendship
            }            
            
            await this.friendshipBussines.addFriend(input)

            res.status(200).send({ message:"Você add um amigo"})

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}