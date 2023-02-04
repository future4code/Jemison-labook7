import { friends } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class FriendshipDatabase extends BaseDatabase {
    private friendTable = 'labook_friendship'

    public addFriend = async (friends: friends) => {
        try {
            await FriendshipDatabase.connection(this.friendTable)
            .insert({
                id: friends.id,
                user: friends.user,
                friendship: friends.friendship
            })

        } catch ( error: any) {
            throw new Error(error.message)
        }
    }

    public deleteFriend = async (id: string) => {
        try {
            await FriendshipDatabase.connection(this.friendTable)
            .where({id})
            .delete()

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}