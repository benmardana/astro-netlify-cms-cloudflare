export namespace https {
  export const post = async <T>(url: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
    console.log({ response });

    const json = await response.json<T>();
    console.log({ json });

    return json;
  };
}
