export namespace oauth {
  interface IGetAccessTokenUrl {
    clientId: string;
    clientSecret: string;
    code: string;
    host: string;
  }

  export const getAccessTokenUrl = ({
    clientId,
    clientSecret,
    code,
    host,
  }: IGetAccessTokenUrl) => {
    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `https://${host}/callback`,
    };
    const url = new URL("https://github.com/login/oauth/access_token");
    url.search = new URLSearchParams(params).toString();

    return url.toString();
  };

  interface IGetAuthUrl {
    clientId: string;
    host: string;
  }

  export const getAuthUrl = ({ clientId, host }: IGetAuthUrl) => {
    const params = {
      client_id: clientId,
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
