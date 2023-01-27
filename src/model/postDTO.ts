import { POST_TYPES } from "./types";

export interface InsertPostInputDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    authorId: string
}