class ErrorUtils {
  public static getErrorMessageFromErrorResponse(errorResponse: any): {
    type: string;
    title: string;
    message: string;
    hint: string;
  } {
    if (errorResponse?.response?.data?.type === "error")
      return errorResponse.response.data;
    if (errorResponse.message)
      return {
        type: "error",
        title: errorResponse.message,
        message: "",
        hint: errorResponse.hint,
      };
    return {
      type: "error",
      title: "Something went wrong",
      message: "Your request could not be processed at this time.",
      hint: "Please try again later",
    };
  }
}

export { ErrorUtils };
