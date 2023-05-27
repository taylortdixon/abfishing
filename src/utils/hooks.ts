import React, { useEffect, useRef } from "react";
import { regulations } from "../fishing-regulations";
import { Waterbody } from "../types/waterbody.type";
import { waterbodyGroups } from "../fishing-waterbody-groups";

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

export const useAssociatedWaterbodyGroupId = (
  waterbodyName: string | undefined,
  waterbodyZone: string | undefined
): string | undefined =>
  React.useMemo(() => {
    return Object.values(waterbodyGroups).find(
      (group) =>
        group.name === waterbodyName &&
        group.waterbodies.some(
          (waterbody) => waterbody.fish_management_zone === waterbodyZone
        )
    )?.id;
  }, [waterbodyName, waterbodyZone]);
