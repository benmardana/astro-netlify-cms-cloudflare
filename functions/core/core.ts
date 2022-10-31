export namespace core {
  export const renderBody = (
    status: string,
    content: {
      token: string;
      provider: string;
    }
  ) => {
    console.log({ status, content });
    return `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:${content.provider}:${status}:${JSON.stringify(
      content
    )}',
            message.origin
          );
  
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
  
        window.opener.postMessage("authorizing:${content.provider}", "*");
      </script>
    `;
  };
}
