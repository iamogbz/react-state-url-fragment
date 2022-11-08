export type JSONValue =
  | null
  | string
  | number
  | boolean
  | JSONObject
  | JSONArray;
export interface JSONObject {
  [x: string]: JSONValue;
}
export type JSONArray = Array<JSONValue>;

export function urlEncode<T>(state: T): string {
  return encodeURIComponent(btoa(JSON.stringify(state)));
}

export function urlDecode<T = JSONValue>(encoded: string): T {
  return JSON.parse(atob(decodeURIComponent(encoded)));
}

// function btoa(data: string): string {
//   return Buffer.from(data).toString("base64");
// }

// function atob(data: string): string {
//   return Buffer.from(data, "base64").toString("ascii");
// }
