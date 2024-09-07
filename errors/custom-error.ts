export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    // Call the parent constructor (Error) to set the message property and initialize the error
    super(message);

    // Set the name of the error to the name of the current class (CustomError)
    this.name = this.constructor.name;

    // Custom property for your custom error
    this.statusCode = statusCode;
  }
}
