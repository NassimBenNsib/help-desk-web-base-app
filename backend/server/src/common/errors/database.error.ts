import { DefaultError } from "./default.error";

class DatabaseError extends DefaultError {
  constructor(
    category: string = "DatabaseError",
    type: string = "DatabaseError",
    title: string = "Database error",
    description = "An error occurred while interacting with the database.",
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

export { DatabaseError };
