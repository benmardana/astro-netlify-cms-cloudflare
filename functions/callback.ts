import { core } from "./core";
import { https } from "./https";
import { Env } from "./types";

export namespace callback {
  export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
    const code = new URL(request.url).searchParams.get("code");
    console.log({ code });

    if (!code) {
      return new Response("missing code", {
        status: 500,
      });
    }

    const host = request.headers.get("host");
    console.log({ host });

    if (!host) {
      return new Response("missing host", {
        status: 500,
      });
    }

    const url = core.getAccessTokenUrl(
      env.OAUTH_GITHUB_CLIENT_ID,
      env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
      host
    );

    try {
      const { access_token } = await https.getAccessToken(url.toString());
      console.log({ access_token });

      const responseBody = core.responseString("success", {
        token: access_token,
        provider: "github",
      });
      console.log({ responseBody });

      return new Response(responseBody, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    } catch (e) {
      return new Response(`error: ${core.getErrorMessage(e)}`, {
        status: 500,
      });
    }
  };
}

export const onRequestGet = callback.onRequestGet;
