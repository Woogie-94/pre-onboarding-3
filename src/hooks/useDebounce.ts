import { useCallback, useRef } from "react";

const useDebounce = () => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback((callback: () => void, delay: number) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    const timeout = setTimeout(() => {
      callback();
    }, delay);

    timer.current = timeout;
  }, []);

  return debounce;
};
export default useDebounce;
