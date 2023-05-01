import * as errors from '../constants/errors.json';

export class TypeCordError<T extends boolean = true> extends Error {
    override name: string = 'TypeCordError';

    constructor(message: T extends true ? keyof typeof errors : string, cause?: ErrorOptions) {
        super(typeof message === 'string' ? message : errors[message], cause);
    };

    toString(): string {
        return `${this.name}: ${this.message}`;
    };
    toJSON(): { name: string; message: string; stack?: string; cause?: unknown; } {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            cause: this.cause
        };
    };
    log(): void {
        return console.error(this.message);
    };
};