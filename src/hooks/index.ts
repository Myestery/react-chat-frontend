import { useEffect, useRef } from "react";

export * from "./UserHooks";
export * from "./WindowHooks";
export * from "./useRedux";
export function usePrevious(value:any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
