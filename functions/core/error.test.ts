import { expect, test } from "vitest";
import { error } from "./error";

const { getErrorMessage } = error;

test("parses error message from Error", () => {
  const error = new Error("Fortune favors the bold.");
  const message = getErrorMessage(error);

  expect(message).toEqual("Fortune favors the bold.");
});

// throw 'What the!?'
// throw 7
// throw {wut: 'is this'}
// throw null
// throw new Promise(() => {})
// throw undefined
test.each([
  ["undefined", undefined, "undefined"],
  ["null", null, "null"],
  ["number", 7, "7"],
  ["string", "What the!?", '"What the!?"'],
  ["object", { wut: "is this" }, '{"wut":"is this"}'],
  ["promise", new Promise(() => {}), "{}"],
  ["date", new Date("1970-01-01T02:00:00.000Z"), '"1970-01-01T02:00:00.000Z"'],
])("parses error message from %s", (_, error, expected) => {
  const message = getErrorMessage(error);

  expect(message).toEqual(expected);
});

test('returns "Unknown Error" message when object throws error', () => {
  var object = {} as any;
  object.a = { b: object };

  expect(() => JSON.stringify(object)).toThrowError();

  const message = getErrorMessage(object);

  expect(message).toEqual("Unknown Error");
});
