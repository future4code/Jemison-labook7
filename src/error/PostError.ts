import { CustomError } from "./CustomError";

export class InvalidInput extends CustomError {
    constructor() {
        super(400, "Post não encotrado")

    }
}