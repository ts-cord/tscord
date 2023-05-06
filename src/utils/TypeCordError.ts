import * as errors from '../constants/errors.json';

export class TypeCordError<T extends boolean = true> extends Error {
    override name: string = 'TypeCordError';

    constructor(message: T extends true ? keyof typeof errors : string, options?: ErrorOptions) {
        super(typeof message === 'string' ? message : errors[message], options);
    };

    toString(): string {
        return `${this.name}: ${this.message}`;
    };
    toJSON(): { name: string; message: string; stack?: string; options?: unknown; } {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            options: this.cause
        };
    };
    log(): void {
        return console.error(this.message);
    };
};