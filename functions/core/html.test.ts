import { expect, test } from "vitest";
import { html } from "./html";

const { successResponseString } = html;

test("renders correct html response", () => {
  const token = "abcd1234";
  const string = successResponseString(token);

  expect(string).toEqual(`
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      "authorization:github:success:{"provider":"github","token":"${token}"}",
      message.origin
    );

    window.removeEventListener("message", receiveMessage, false);
  };
  window.addEventListener("message", receiveMessage, false);

  window.opener.postMessage("authorizing:github", "*");
</script>
    `);
});
