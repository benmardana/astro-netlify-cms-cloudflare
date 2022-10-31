import { Env } from "./types";

export namespace auth {
  export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
    const host = request.headers.get("host");
    console.log({ host });

    const params = {
      client_id: env.OAUTH_GITHUB_CLIENT_ID,
      redirect_uri: `https://${host}/callback`,
      scope: "repo,user",
    };
    console.log(params);

    const url = new URL("https://github.com/login/oauth/authorize");
    url.search = new URLSearchParams(params).toString();
    console.log({
      url,
    });

    return Response.redirect(url.toString(), 301);
  };
}

export const onRequestGet = auth.onRequestGet;
