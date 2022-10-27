import { core } from "../core/core";
import { Env } from "./types";

export namespace auth {
  export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
    const host = request.headers.get("host");
    console.log({ host });

    const authOptions = {
      redirect_uri: `https://${host}/callback?provider=github`,
      scope: "repo,user",
      state: crypto.randomUUID(),
    };
    console.log(authOptions);

    const authorizationUri = core
      .authCode(env.OAUTH_GITHUB_CLIENT_ID, env.OAUTH_GITHUB_CLIENT_SECRET)
      .authorizeURL(authOptions);
    console.log({
      authorizationUri,
    });

    return Response.redirect(authorizationUri, 301);
  };
}

export const onRequestGet = auth.onRequestGet;
