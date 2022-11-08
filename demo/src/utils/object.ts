export type ObjectEntry<T extends Record<string, unknown>> = {
  [k in keyof T]: [k, T[k]];
}[string];
