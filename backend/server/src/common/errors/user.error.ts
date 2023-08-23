import { DefaultError } from "./default.error";

class UserError extends DefaultError {
  constructor(
    category: string = "UserError",
    type: string = "UserError",
    title: string = "User error",
    description: string = "The user you are trying to use is not valid.",
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

class UserEmailAlreadyExistsError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserEmailAlreadyExistsError",
    title: string = "User email already exists",
    description: string = "The email you are trying to use already exists in our database.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 409,
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

class UserPhoneNumberAlreadyExistsError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserPhoneNumberAlreadyExistsError",
    title: string = "User phone number already exists",
    description: string = "The phone number you are trying to use already exists in our database.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 409,
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

class UserEmailDoesNotExistError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserEmailDoesNotExistError",
    title: string = "User email does not exist",
    description: string = "The phone number you are trying to use already exists in our database.",
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

class UserUUIDDoesNotExistError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserUUIDDoesNotExistError",
    title: string = "User UUID does not exist",
    description: string = "The UUID you are trying to use does not exist in our database.",
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

class UserPasswordDoesNotMatchError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserPasswordDoesNotMatchError",
    title: string = "User password does not match",
    description: string = "The password you are trying to use does not match the one in our database.",
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

class UserResetPasswordCodeDoesNotExistError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserResetPasswordCodeDoesNotExistError",
    title: string = "User reset password code does not exist",
    description: string = "The reset password code you are trying to use does not exist in our database.",
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

class UserPasswordWrong extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserPasswordWrong",
    title: string = "User password wrong",
    description: string = "The password you are trying to use is wrong.",
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

class UserResetPasswordCodeExpiredError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserResetPasswordCodeExpiredError",
    title: string = "User reset password code expired",
    description: string = "The reset password code you are trying to use has expired.",
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

class UserUnverifiedError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserUnverifiedError",
    title: string = "User unverified",
    description: string = "The user you are trying to use is not verified.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 403,
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

class UserBannedError extends UserError {
  constructor(
    category: string = "UserError",
    type: string = "UserBannedError",
    title: string = "User banned",
    description: string = "The user you are trying to use is banned.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 403,
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
  UserError,
  UserEmailAlreadyExistsError,
  UserPhoneNumberAlreadyExistsError,
  UserEmailDoesNotExistError,
  UserUUIDDoesNotExistError,
  UserPasswordDoesNotMatchError,
  UserResetPasswordCodeDoesNotExistError,
  UserPasswordWrong,
  UserResetPasswordCodeExpiredError,
  UserUnverifiedError,
  UserBannedError,
};
