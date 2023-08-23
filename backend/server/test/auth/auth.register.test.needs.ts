import {
  NormalizerSerializerUtils,
  ApplicationCore,
  MailerCore,
  DatabaseCore,
  deepMerge,
  faker,
  request,
  UsersServices,
  HashEncryptUtils,
} from "../test.needs";

interface RegisterData {
  data: Array<any>;
  request: Array<{
    headers: any;
    body: any;
    params: any;
    query: any;
  }>;
  database: Array<any>;
  response: Array<any>;
  expected: Array<any>;
}

const normalCaseExpected = (data: any) => {
  return {
    code: 201,
    description: "Congratulations, your account has been created successfully.",
    details: {
      error: null,
      input: {
        body: data,
        headers: {},
        params: {},
        query: {},
      },
      output: {
        emailPreference: {
          accountActivity: true,
          messages: true,
          newsletter: true,
          ticket: true,
          usersActivity: true,
          virtualAssistant: true,
        },
        generalPreference: {
          darkMode: false,
          fontSize: 16,
          language: "en",
          timezone: "UTC",
        },
        notificationPreference: {
          accountActivity: true,
          messages: true,
          newsletter: true,
          ticket: true,
          usersActivity: true,
          virtualAssistant: true,
        },
        profile: {
          address: null,
          birthDate: null,
          city: null,
          country: null,
          department: null,
          email: NormalizerSerializerUtils.normalizeEmail(data.email),
          firstName: null,
          lastName: null,
          organization: null,
          phoneNumber: null,
          position: null,
          profilePicture: null,
          role: "USER",
          status: "UNVERIFIED",
          zipCode: null,
        },
      },
      warning: null,
    },
    hint: "Please wait for admin approval to access your account.",
    message: "Account created successfully.",
    result: null,
    title: "Registration Successful",
  };
};

const takenEmailCaseExpected = (data: any) => {
  return {
    code: 409,
    description: `The email address ${data.email} is already registered in our system. Please check the database for duplicate entries.`,
    details: {
      error: null,
      input: {
        body: data,
        headers: {},
        params: {},
        query: {},
      },
      output: {
        email_normalized: NormalizerSerializerUtils.normalizeEmail(data.email),
      },
      warning: null,
    },
    hint: "Please try again with a different email address.",
    message: "This email address is already registered.",
    result: null,
    title: "Registration failed",
  };
};

const wrongRequestDataCaseExpected = (data: any) => {
  return {
    code: 400,
    description: "The request data is invalid.",
    details: {
      error: {
        issues: [
          {
            validation: "email",
            code: "invalid_string",
            message: "Email is not valid",
            path: ["body", "email"],
          },
          {
            code: "invalid_type",
            expected: "string",
            received: "boolean",
            path: ["body", "password"],
            message: "Password must be a string",
          },
          {
            code: "invalid_type",
            expected: "string",
            received: "number",
            path: ["body", "passwordConfirmation"],
            message: "Password confirmation must be a string",
          },
          {
            code: "invalid_type",
            expected: "boolean",
            received: "string",
            path: ["body", "termsAndConditions"],
            message: "You must accept the terms and conditions",
          },
        ],
        name: "ZodError",
      },
      input: {
        body: data,
        params: {},
        query: {},
      },
      output: null,
      warning: null,
    },
    hint: "Please check the request data and try again.",
    message: "Invalid request data",
    result: null,
    title: "Bad Request",
  };
};
export {
  normalCaseExpected,
  takenEmailCaseExpected,
  wrongRequestDataCaseExpected,
  RegisterData,
  NormalizerSerializerUtils,
  ApplicationCore,
  MailerCore,
  DatabaseCore,
  deepMerge,
  faker,
  request,
  UsersServices,
  HashEncryptUtils,
};
