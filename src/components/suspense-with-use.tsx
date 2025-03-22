//src/components/suspense-with-use.tsx
import { ReactNode, Suspense, use } from "react";

type UseProps<T> = {
  promise?: Promise<T> | undefined;
  children: (data: T) => ReactNode;
};

const Use = <T,>({ promise, children }: UseProps<T>) => {
  if (!promise) return null;
  const data = use(promise);
  return children(data);
};

type SuspenseWithUseProps<T> = {
  fallback: ReactNode;
} & UseProps<T>;

const SuspenseWithUse = <T,>({
  fallback,
  promise,
  children,
}: SuspenseWithUseProps<T>) => (
  <Suspense fallback={fallback}>
    {promise ? <Use promise={promise}>{children}</Use> : null}
  </Suspense>
);

export default SuspenseWithUse;
