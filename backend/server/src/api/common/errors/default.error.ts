class DefaultError extends Error {
  public category: string = "";
  public type: string = "";
  public title: string = "";
  public description: string = "";
  public step: string = "";
  public params: Object = {};
  public details: Object = {};
  public statusCode: number = 404;
  public callback: Function | null = null;

  constructor(
    category: string = "DefaultError",
    type: string = "DefaultError",
    title: string = "Default error",
    description: string = "The error is not defined.",
    step: string = "Unknown step",
    params: Object = {},
    details: Object = {},
    statusCode: number = 404,
    callback: Function | null
  ) {
    super(type);
    this.category = category;
    this.type = type;
    this.title = title;
    this.description = description;
    this.step = step;
    this.params = params;
    this.details = details;
    this.statusCode = statusCode;
    this.callback = callback;
  }
}

export { DefaultError };
