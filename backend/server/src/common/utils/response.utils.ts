import { Request } from "../../../lib/external.lib";
import { APP_CONFIG } from "../../../lib/internal.lib";

class ResponseUtils {
  public static generateMessage(
    type: string,
    code: number,
    title: string,
    message: string,
    description: string,
    hint: string,
    result: any,
    output: any,
    error: any,
    warning: any,
    request: Request
  ): {
    type: string;
    code: number;
    title: string | null | undefined;
    message: string | null | undefined;
    description: string;
    hint: string;
    result: any;
    details:
      | {
          input: any;
          output: any;
          error: any;
          warning: any;
        }
      | undefined
      | null;
  } {
    if (APP_CONFIG.MODE !== "production")
      return {
        type,
        code,
        title,
        message,
        description,
        hint,
        result,
        details: {
          input: {
            headers: request.headers,
            body: request.body,
            query: request.query,
            params: request.params,
          },
          output: output,
          error: error,
          warning: warning,
        },
      };
    return {
      type,
      code,
      title,
      message,
      description,
      hint,
      result,
      details: null,
    };
  }
  public static generateErrorMessage(
    code: number,
    title: string,
    message: string,
    description: string,
    hint: string,
    result: any,
    output: any,
    error: any,
    warning: any,
    request: Request
  ): {
    type: string;
    code: number;
    title: string | null | undefined;
    message: string | null | undefined;
    description: string;
    hint: string;
    result: any;
    details:
      | {
          input: any;
          output: any;
          error: any;
          warning: any;
        }
      | undefined
      | null;
  } {
    return this.generateMessage(
      "error",
      code,
      title,
      message,
      description,
      hint,
      result,
      output,
      error,
      warning,
      request
    );
  }

  public static generateSuccessMessage(
    code: number,
    title: string,
    message: string,
    description: string,
    hint: string,
    result: any,
    output: any,
    error: any,
    warning: any,
    request: Request
  ): {
    type: string;
    code: number;
    title: string | null | undefined;
    message: string | null | undefined;
    description: string;
    hint: string;
    result: any;
    details:
      | {
          input: any;
          output: any;
          error: any;
          warning: any;
        }
      | undefined
      | null;
  } {
    return this.generateMessage(
      "success",
      code,
      title,
      message,
      description,
      hint,
      result,
      output,
      error,
      warning,
      request
    );
  }
}

export { ResponseUtils };
