import { TypeCordError as TypeCordErrorStructure } from "../types";

export class TypeCordError extends Error {
    public code: number;
    override name = "TypeCordError";

    constructor({ message, options, code }: TypeCordErrorStructure) {
        super(message, options);

        this.code = code;
    }
}