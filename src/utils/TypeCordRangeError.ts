export class TypeCordRangeError extends RangeError {
    override name: string = 'TypeCordRangeError';

    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
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