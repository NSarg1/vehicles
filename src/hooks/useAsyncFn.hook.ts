import { useCallback, useEffect, useRef, useState } from 'react';

type AsyncFunction<T extends unknown[]> = (...args: T) => Promise<void>;

const useAsyncFn = <T extends unknown[]>(callback: AsyncFunction<T>): [AsyncFunction<T>, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const cbWithLoader = useCallback(async (...args: T) => {
    setIsLoading(true);
    try {
      await ref.current(...args);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [cbWithLoader, isLoading];
};

export default useAsyncFn;
