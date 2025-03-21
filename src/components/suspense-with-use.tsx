//src/components/suspense-with-use.tsx
import { ReactNode, Suspense, use } from "react";

type UseProps<T> = {
  promise: Promise<T>;
  children: (data: T) => ReactNode;
};

const Use = <T,>({ promise, children }: UseProps<T>) => {
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
    <Use promise={promise}>{children}</Use>
  </Suspense>
);

export default SuspenseWithUse;
