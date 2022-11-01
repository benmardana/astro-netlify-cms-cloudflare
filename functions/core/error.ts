export namespace error {
  type ErrorWithMessage = {
    message: string;
  };

  const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string";

  const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) {
      console.log({ errorMessage: maybeError.message });
      return maybeError;
    }

    try {
      const stringifiedError =
        maybeError !== undefined ? JSON.stringify(maybeError) : "undefined";
      console.log({ stringifiedError });
      return new Error(stringifiedError);
    } catch {
      const unknownError = "Unknown Error";
      console.log({ unknownError });
      return new Error(unknownError);
    }
  };

  export const getErrorMessage = (error: unknown) =>
    toErrorWithMessage(error).message;
}
