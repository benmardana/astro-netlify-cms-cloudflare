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
      const stringifiedError = JSON.stringify(maybeError);
      console.log({ stringifiedError });
      return new Error(stringifiedError);
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      const errorError = JSON.stringify(maybeError);
      console.log({ errorError });
      return new Error(errorError);
    }
  };

  export const getErrorMessage = (error: unknown) =>
    toErrorWithMessage(error).message;
}
