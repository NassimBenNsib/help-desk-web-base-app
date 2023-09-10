import { ConsoleUtils } from "./console.utils";

class CorsUtils {
  public static serializeOrigins(
    origins: string = ""
  ): null | string | Array<string> {
    if (!origins) return null;
    if (origins === "*") return origins;
    const originsArray = origins.split(",");
    if (originsArray.length === 0) return null;
    originsArray.forEach((origin) => {
      if (!origin) return null;
      try {
        new URL(origin);
      } catch (error) {
        ConsoleUtils.error([
          "CorsUtils",
          "serializeOrigins",
          "Error in new URL(origin)",
          "BEGIN ERROR",
        ]);
        console.table(error);
        console.log(error);
        ConsoleUtils.warn([
          "CorsUtils",
          "serializeOrigins",
          "Error in new URL(origin)",
          "END ERROR",
        ]);
        return null;
      }
    });
    return origins;
  }
  public static serializeMethods(
    methods: string = ""
  ): null | string | Array<string> {
    if (!methods) return null;
    if (methods === "*") return methods;
    const methodsArray = methods.split(",");
    if (methodsArray.length === 0) return null;
    methodsArray.forEach((method) => {
      if (!method) return null;
      if (
        !["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].includes(method)
      )
        return null;
    });
    return methods;
  }
  public static serializeHeaders(
    headers: string = ""
  ): null | string | Array<string> {
    if (!headers) return null;
    if (headers === "*") return headers;
    const headersArray = headers.split(",");
    if (headersArray.length === 0) return null;
    headersArray.forEach((header) => {
      if (!header) return null;
    });
    return headers;
  }
}

export { CorsUtils };
