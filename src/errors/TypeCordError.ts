export class TypeCordError extends Error {
    constructor(message: string) {
        super(message), this.name = 'TypeCordError';

        return this;
    };
};