import React from "react";

import { useCycle } from "../hooks/useCycle";

interface LoadingIconProps {
  completion?: number;
}

export function LoadingIcon(props: LoadingIconProps) {
  const percentComplete = useCompletion(props.completion);

  return (
    <span id="loading-icon" style={{ margin: "2px 8px" }}>
      <span style={{ opacity: getRelativePercentage(percentComplete, 0.3) }}>
        {">"}
      </span>
      <span style={{ opacity: getRelativePercentage(percentComplete, 0.5) }}>
        {">"}
      </span>
      <span style={{ opacity: getRelativePercentage(percentComplete, 0.7) }}>
        {">"}
      </span>
      <span style={{ opacity: getRelativePercentage(percentComplete, 1) }}>
        {">"}
      </span>
    </span>
  );
}

function useCompletion(value?: number) {
  const [numerator, denominator] = useCycle();
  return value ?? numerator / denominator;
}

function getRelativePercentage(from: number, to: number, max = 1) {
  const diff = Math.abs(to - from);
  return diff > max / 2 ? max - diff : diff;
}
