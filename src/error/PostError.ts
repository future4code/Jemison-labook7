import { CustomError } from "./CustomError";

export class InvalidInput extends CustomError {
    constructor() {
        super(404, "Post não encontrado")

    }
}