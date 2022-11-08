import * as d3 from "d3";
import { useEffect } from "react";

export function useLoop(...args: Parameters<typeof d3.timer>) {
  useEffect(() => {
    const t = d3.timer(...args);
    return () => t.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);
}
