import { core } from "../core/core";
import { Env } from "./types";

export namespace callback {
  export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
    const host = request.headers.get("host");
    console.log({ host });

    const code = new URL(request.url).searchParams.get("code");
    console.log({ code });

    if (!code) {
      return new Response("missing code", {
        status: 500,
      });
    }

    try {
      const tokenParams = {
        code: code,
        redirect_uri: `https://${host}/callback?provider=github`,
      };
      console.log({ tokenParams });

      const accessToken = await core
        .authCode(env.OAUTH_GITHUB_CLIENT_ID, env.OAUTH_GITHUB_CLIENT_SECRET)
        .getToken(tokenParams);
      console.log({ accessToken });

      const responseBody = core.renderBody("success", {
        token: accessToken.token.access_token,
        provider: "github",
      });
      console.log({ responseBody });

      return new Response(responseBody);
    } catch (e: any) {
      console.log({ e });
      return new Response(core.renderBody("error", e.message), {
        status: 500,
      });
    }
  };
}

export const onRequestGet = callback.onRequestGet;
