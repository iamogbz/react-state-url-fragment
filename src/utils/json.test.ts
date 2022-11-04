import { urlDecode, urlEncode } from "./json";
import { urlStateDecoded, urlStateEncoded } from "./json.mocks";

describe("json", () => {
  it("encodes and decodes as expected", () => {
    const encodedResult = urlEncode(urlStateDecoded);
    expect(encodedResult).toEqual(urlStateEncoded);
    const decodedResult = urlDecode(encodedResult);
    expect(decodedResult).toEqual(urlStateDecoded);
  });
});
