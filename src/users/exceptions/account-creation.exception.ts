import {HttpException, HttpStatus} from "@nestjs/common";

export class AccountCreationException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.FORBIDDEN);
    }
}