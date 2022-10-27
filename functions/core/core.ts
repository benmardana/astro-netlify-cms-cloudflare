import { AuthorizationCode } from "simple-oauth2";

export namespace core {
  export const authCode = (id: string, secret: string) => {
    console.log({ id, secret });

    const authCodeOptions = {
      client: {
        id,
        secret,
      },
      auth: {
        tokenHost: "https://github.com",
        tokenPath: "/login/oauth/access_token",
        authorizePath: "/login/oauth/authorize",
      },
    };
    console.log({ authCodeOptions });

    return new AuthorizationCode(authCodeOptions);
  };

  export const renderBody = (
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
}
