import { useCallback, useState } from "react";

const useInput = <T>(initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback((value: T) => {
    setValue(value);
  }, []);

  return [value, onChange];
};

export default useInput;
