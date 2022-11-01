export namespace https {
  export const getAccessToken = async (url: string) => {
    const response = await fetch(url, {
      method: "POST",
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

    return json;
  };
}
