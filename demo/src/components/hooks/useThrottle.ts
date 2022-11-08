import { throttle, ThrottleSettings } from "lodash";
import { useRef } from "react";

export const useThrottle = <T extends (...args: never[]) => unknown>(
  func: T,
  wait?: number,
  options?: ThrottleSettings
) => useRef(throttle(func, wait, options)).current;
