class DefaultError extends Error {
  public code: number;
  public title: string;
  public message: string;
  public description: string;
  public hint: string;
  public result: any;
  public details?: any;

  constructor(
    code: number,
    title: string = "Default Error",
    message: string = "Something went wrong",
    description: string = "Something went wrong",
    hint: string = "Please try again later",
    result: any,
    details?: any
  ) {
    super(title + " \n" + message);
    this.code = code;
    this.title = title;
    this.message = message;
    this.description = description;
    this.hint = hint;
    this.result = result;
    this.details = details;
  }
}

export { DefaultError };
