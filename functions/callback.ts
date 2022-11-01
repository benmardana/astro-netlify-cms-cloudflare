import { error, html, oauth } from "./core";
import { https } from "./adapters";
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

    const url = oauth.getAccessTokenUrl({
      clientId: env.OAUTH_GITHUB_CLIENT_ID,
      clientSecret: env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
      host,
    });

    try {
      const { access_token } = await https.post<{
        access_token: string;
        scope: string;
        token_type: string;
      }>(url);
      console.log({ access_token });

      const responseString = html.successResponseString(access_token);
      console.log({ responseString });

      return new Response(responseString, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    } catch (e) {
      return new Response(`error: ${error.getErrorMessage(e)}`, {
        status: 500,
      });
    }
  };
}

export const onRequestGet = callback.onRequestGet;
