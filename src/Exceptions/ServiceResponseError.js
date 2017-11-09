import ExtendableError from '../Utils/ExtendableError';

export default class ServiceResponseError extends ExtendableError {
    constructor(message, response) {
        super(message);

        this.response = response;
    }

    toString() {
        return `${this.message} - ${this.response.status}: ${this.response.statusText}`;
    }
}