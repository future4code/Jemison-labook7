import { generationId } from './../services/idGenerator';
import { FriendshipDatabase } from "../data/FriendshipDatabase";
import { CustomError } from "../error/CustomError";
import { friendshipDTO } from '../model/friendshipDTO';
import { friends } from '../model/user';

export class FriendshipBusiness {
    private friendshipDatbase = new FriendshipDatabase()

    public addFriend = async(input: friendshipDTO) => {
        let message = "Add com sucesso!"

        const { user, friendship } = input
        

        if (!user || !friendship) {
            throw new CustomError (400, 'Preencha todos os campos')
        }

        const id: string = generationId()

        const friends: friends = {
            id,
            user,
            friendship
        }

        await this.friendshipDatbase.addFriend(friends)

    }

    public deleteFriend = async (id: string) => {
        await this.friendshipDatbase.deleteFriend(id)
    }
}