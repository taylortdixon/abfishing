import React, { useEffect, useRef } from "react";
import { regulations } from "../fishing-regulations";
import { Waterbody } from "../types/waterbody.type";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const useSelectedWaterbody = (
  id: string | undefined
): Waterbody | undefined =>
  React.useMemo(
    () => regulations.find((waterbody) => waterbody.id === id),
    [id]
  );
