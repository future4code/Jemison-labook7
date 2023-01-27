import { POST_TYPES } from "./types";

export interface PostInputDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    authorId: string
}

export interface InsertPostInputDTO {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    created_at: Date,
    author_id: string
}