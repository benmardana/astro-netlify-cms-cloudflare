export namespace html {
  export const successResponseString = (token: string) => {
    const content = {
      provider: "github",
      token,
    };
    console.log({ content });

    return `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      "authorization:${content.provider}:success:${JSON.stringify(content)}",
      message.origin
    );

    window.removeEventListener("message", receiveMessage, false);
  };
  window.addEventListener("message", receiveMessage, false);

  window.opener.postMessage("authorizing:${content.provider}", "*");
</script>
    `;
  };
}
