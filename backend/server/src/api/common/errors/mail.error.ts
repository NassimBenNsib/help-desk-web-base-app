import { DefaultError } from "./default.error";

class MailError extends DefaultError {
  constructor(
    category: string = "MailError",
    type: string = "MailError",
    title: string = "Mail error",
    description: string = "An error occurred while interacting with the email service.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 500,
    callback: Function | null
  ) {
    super(
      category,
      type,
      title,
      description,
      step,
      params,
      details,
      statusCode,
      callback
    );
  }
}

export { MailError };
