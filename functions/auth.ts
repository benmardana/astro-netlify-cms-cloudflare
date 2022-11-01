import { oauth } from "./core";
import { Env } from "./types";

export namespace auth {
  export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
    const host = request.headers.get("host");
    console.log({ host });

    if (!host) {
      return new Response("missing host", {
        status: 500,
      });
    }

    const url = oauth.getAuthUrl({
      clientId: env.OAUTH_GITHUB_CLIENT_ID,
      host,
    });
    console.log({
      url,
    });

    return Response.redirect(url, 301);
  };
}

export const onRequestGet = auth.onRequestGet;
