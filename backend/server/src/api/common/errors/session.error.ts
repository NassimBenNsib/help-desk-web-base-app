import { DefaultError } from "./default.error";

class SessionError extends DefaultError {
  constructor(
    category: string = "SessionError",
    type: string = "SessionError",
    title: string = "Session error",
    description: string = "The session you are trying to use is not valid.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 400,
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
class SessionDoesNotExistError extends SessionError {
  constructor(
    category: string = "SessionError",
    type: string = "SessionDoesNotExistError",
    title: string = "Session does not exist",
    description: string = "The session you are trying to use does not exist in our database.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 404,
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

class SessionExpiredError extends SessionError {
  constructor(
    category: string = "SessionError",
    type: string = "SessionExpiredError",
    title: string = "Session expired",
    description: string = "The session you are trying to use has expired.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 400,
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

class SessionInvalidError extends SessionError {
  constructor(
    category: string = "SessionError",
    type: string = "SessionInvalidError",
    title: string = "Session invalid",
    description: string = "The session you are trying to use is not valid.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 400,
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

export {
  SessionError,
  SessionDoesNotExistError,
  SessionExpiredError,
  SessionInvalidError,
};
