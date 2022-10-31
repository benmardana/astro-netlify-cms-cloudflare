import { core } from "./core/core";
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

    const params = {
      client_id: env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: env.OAUTH_GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: `https://${host}/callback`,
    };
    const url = new URL("https://github.com/login/oauth/access_token");
    url.search = new URLSearchParams(params).toString();

    try {
      const response = await fetch(url.toString(), {
        method: "POST",
        body: url.search,
        headers: {
          Accept: "application/json",
        },
      });
      console.log({ response });

      const json = await response.json<{
        access_token: string;
        scope: string;
        token_type: string;
      }>();
      console.log({ json });

      const responseBody = core.renderBody("success", {
        token: json.access_token,
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
