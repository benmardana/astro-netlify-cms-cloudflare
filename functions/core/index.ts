export namespace core {
  export const getAccessTokenUrl = (
    client_id: string,
    client_secret: string,
    code: string,
    host: string
  ) => {
    const params = {
      client_id,
      client_secret,
      code,
      redirect_uri: `https://${host}/callback`,
    };
    const url = new URL("https://github.com/login/oauth/access_token");
    url.search = new URLSearchParams(params).toString();

    return url.toString();
  };

  export const getAuthURL = (client_id: string, host: string) => {
    const params = {
      client_id,
      redirect_uri: `https://${host}/callback`,
      scope: "repo,user",
    };
    console.log(params);

    const url = new URL("https://github.com/login/oauth/authorize");
    url.search = new URLSearchParams(params).toString();
    console.log({
      url,
    });

    return url.toString();
  };

  export const responseString = (
    status: string,
    content: {
      token: string;
      provider: string;
    }
  ) => {
    console.log({ status, content });
    return `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:${content.provider}:${status}:${JSON.stringify(
      content
    )}',
            message.origin
          );
  
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
  
        window.opener.postMessage("authorizing:${content.provider}", "*");
      </script>
    `;
  };

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
