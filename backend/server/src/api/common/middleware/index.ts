import {
  ConsoleUtils,
  FILE_UPLOAD_CONFIG,
  FileCategoryType,
  HashEncryptUtils,
  RequestUtils,
  ResponseUtils,
  SessionsServices,
  UsersRoleEnum,
  UsersStatusEnum,
} from "../../../../lib/internal.lib";
import {
  cors,
  Request,
  Response,
  NextFunction,
  z,
  multer,
} from "../../../../lib/external.lib";
import path from "path";

class Middleware {
  public static cors(
    origins: string | Array<string>,
    allowedHeaders: string | Array<string>,
    allowedMethods: string | Array<string>
  ): any {
    return cors({
      origin: origins,
      allowedHeaders: allowedHeaders,
      methods: allowedMethods,
    });
  }

  public static async errorHandler(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    ConsoleUtils.error(["Middleware", "errorHandler", "ERROR BEGIN"]);
    console.table(error);
    console.log(error);
    ConsoleUtils.warn(["Middleware", "errorHandler", "ERROR END"]);

    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return response
      .status(status)
      .send(
        ResponseUtils.generateErrorMessage(
          status,
          "Unexpected Error",
          "Internal Server Error",
          message || "An unexpected error occurred.",
          "Please try again later.",
          null,
          null,
          error,
          null,
          request
        )
      );
  }

  public static requestDataValidator(schema: z.AnyZodObject) {
    return (request: Request, response: Response, next: NextFunction) => {
      try {
        if (schema) {
          schema.parse({
            body: request.body,
            query: request.query,
            params: request.params,
          });
        }
        next();
      } catch (error: any) {
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Bad Request",
              "Invalid request data",
              "The request data is invalid.",
              "Please check the request data and try again.",
              null,
              null,
              error,
              null,
              request
            )
          );
      }
    };
  }

  public static fileUploader(fileCategoryType: FileCategoryType) {
    return multer({
      storage: multer.diskStorage({}),
      limits: {
        fileSize: FILE_UPLOAD_CONFIG[fileCategoryType].MAX_SIZE,
      },
      fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if (
          FILE_UPLOAD_CONFIG[fileCategoryType].ALLOWED_EXTENSIONS.includes(
            extension.substring(1)
          )
        ) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type"));
        }
      },
    }).single("single");
  }

  public static authorize(
    roles: Array<UsersRoleEnum>,
    allowUncompletedProfile: boolean = false,
    isApiAccessible: boolean | null = null
  ): any {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        if (isApiAccessible === true) return next();
        if (isApiAccessible === false)
          return response
            .status(403)
            .send(
              ResponseUtils.generateErrorMessage(
                403,
                "Authorization Failed",
                "Access to the API is forbidden.",
                "Access to the API is forbidden.",
                "Please contact the administrator to request for access.",
                null,
                null,
                null,
                null,
                request
              )
            );
        let reversed_token: any = null,
          session: any = null,
          token: any = null,
          session_database: any = null,
          request_info: any = RequestUtils.getRequestInfo(request);
        request_info = {
          ...request_info.geo,
          ...request_info.useragent,
          ip: request_info.ip,
        };
        const errorMessage = (
          status_code: number,
          message: string,
          description: string,
          hint: string,
          output: any = null,
          error: any = null,
          warning: any = null
        ) =>
          response.status(status_code).send(
            ResponseUtils.generateErrorMessage(
              status_code,
              "Authorization Failed",
              message,
              description,
              hint,
              null,
              output || {
                session_database,
                session,
                request_info,
                token,
                reversed_token,
              },
              error,
              warning,
              request
            )
          );
        const compareSession = (session_1: any, session_2: any) =>
          compareRequestSession(session_1, session_2) &&
          session_1.id === session_2.id &&
          session_1.ip === session_2.ip &&
          session_1.userId === session_2.userId &&
          session_1.expiresDuration === session_2.expiresDuration &&
          session_1.revoked === session_2.revoked;
        const compareRequestSession = (session_1: any, session_2: any) =>
          session_1.city === session_2.city &&
          session_1.country === session_2.country &&
          session_1.timezone === session_2.timezone &&
          session_1.device === session_2.device &&
          session_1.platform === session_2.platform &&
          session_1.os === session_2.os &&
          session_1.browser === session_2.browser &&
          session_1.region === session_2.region &&
          session_1.version === session_2.version;

        // Check if the token is valid
        if (!request.headers.authorization)
          return errorMessage(
            401,
            "The authorization token is missing.",
            "Authorization token missing.",
            "Please login to access this resource."
          );
        if (!request.headers?.authorization?.startsWith("Bearer"))
          return errorMessage(
            401,
            "Invalid authorization token",
            "The authorization token is not in the correct format. It should start with 'Bearer '",
            ""
          );
        if (!(token = request.headers?.authorization?.split("Bearer ")[1]))
          return errorMessage(
            401,
            "Invalid authorization token",
            "The authorization token is not in the correct format. It should contain the token after 'Bearer '",
            ""
          );
        if (!(reversed_token = HashEncryptUtils.reverseGeneratedToken(token)))
          return errorMessage(
            401,
            "Invalid authorization token",
            "The token structure is invalid. Please ensure it is properly generated.",
            ""
          );
        if (
          new Date(
            reversed_token.iat * 1000 + reversed_token.expiresDuration
          ).getTime() < Date.now()
        )
          return errorMessage(
            401,
            "Invalid authorization token",
            "The token has expired.",
            "Please login to access this resource."
          );
        // Check if the session is valid
        if (!(session = HashEncryptUtils.decryptSession(reversed_token.data)))
          return errorMessage(
            401,
            "Invalid authorization token",
            "The session structure is invalid. Please ensure it is properly encrypted.",
            ""
          );
        if (!compareRequestSession(session, request_info))
          return errorMessage(
            401,
            "Invalid authorization token",
            "The token session does not match the request session.",
            ""
          );

        if (
          !(session_database = await SessionsServices.deepFindOneById(
            session.id
          ))
        )
          return errorMessage(
            401,
            "Invalid authorization token",
            "The session ID provided in the token does not found.",
            ""
          );
        if (
          new Date(session_database.createdAt).getTime() +
            parseInt(session_database.expiresDuration) <
          Date.now()
        )
          return errorMessage(
            401,
            "Invalid authorization token",
            "The session has expired.",
            ""
          );
        if (session_database.revoked)
          return errorMessage(
            401,
            "Invalid authorization token",
            "The session has been revoked.",
            ""
          );
        if (!compareSession(session_database, session))
          return errorMessage(
            401,
            "Invalid authorization token",
            "The session does not match the token session.",
            ""
          );
        // Check if the user is valid
        if (!session_database.user)
          return errorMessage(
            401,
            "Invalid authorization token",
            "The user associated with the session does not exist.",
            ""
          );
        if (session_database.user.status === UsersStatusEnum.BANNED)
          return errorMessage(
            401,
            "Account blocked",
            "This user account has been blocked.",
            "Please contact the administrator to unblock your account."
          );
        if (session_database.user.status === UsersStatusEnum.UNVERIFIED)
          return errorMessage(
            401,
            "Account unverified",
            "This user account has not been verified.",
            "Please contact the administrator to approve your account."
          );
        if (
          !allowUncompletedProfile &&
          session_database.user.status === UsersStatusEnum.UNCOMPLETED
        )
          return errorMessage(
            401,
            "Profile uncompleted",
            "This user account profile is incomplete.",
            "Please complete your profile to access this resource."
          );
        if (!roles.includes(session_database.user.role))
          return errorMessage(
            401,
            "Unauthorized",
            "This user account does not have the required role to access this resource.",
            "Please contact the administrator to request for access."
          );

        // Update the session IP if it is different
        if (session_database.ip !== request_info.ip) {
          await SessionsServices.updateOneIpAddressById(
            session_database.id,
            request_info.ip
          );
        }
        // Update the request info
        request.user = session_database;

        next();
      } catch (error: any) {
        ConsoleUtils.error("Error in authorize");
        console.table(error);
        console.log(error);
        return response
          .status(500)
          .send(
            ResponseUtils.generateErrorMessage(
              500,
              "Authorization Failed",
              "Unable to authorize the request.",
              "An error occurred while authorizing the request.",
              "Please try again later.",
              null,
              null,
              error,
              null,
              request
            )
          );
      }
    };
  }
}

export { Middleware };
