import { DefaultError } from "./default.error";

class RequestError extends DefaultError {
  constructor(
    category: string = "RequestError",
    type: string = "RequestError",
    title: string = "Request error",
    description: string = "The request you are trying to use is not valid.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 400,
    callback: Function | null = null
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
class RequestBadDataError extends RequestError {
  constructor(
    category: string = "RequestError",
    type: string = "RequestBadDataError",
    title: string = "Request bad data error",
    description: string = "The request you are trying to use is not valid.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 400,
    callback: Function | null = null
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

class RequestPermissionError extends RequestError {
  constructor(
    category: string = "RequestError",
    type: string = "RequestPermissionError",
    title: string = "Request permission error",
    description: string = "The request you are trying to use is not allowed.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 403,
    callback: Function | null = null
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

class RequestNotFoundError extends RequestError {
  constructor(
    category: string = "RequestError",
    type: string = "RequestNotFoundError",
    title: string = "Request not found error",
    description: string = "The request you are trying to use does not exist.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 404,
    callback: Function | null = null
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

class RequestRateLimit extends RequestError {
  constructor(
    category: string = "RequestError",
    type: string = "RequestRateLimit",
    title: string = "Request rate limit error",
    description: string = "The request you are trying to use is not allowed due to rate limit.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 429,
    callback: Function | null = null
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
  RequestError,
  RequestBadDataError,
  RequestPermissionError,
  RequestNotFoundError,
  RequestRateLimit,
};
