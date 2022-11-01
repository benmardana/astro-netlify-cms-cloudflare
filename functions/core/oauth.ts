export namespace oauth {
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
}
