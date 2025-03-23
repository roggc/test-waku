import { EnhancedSuspense } from "react-enhanced-suspense";

export default async function Server() {
  const promise = new Promise<string>((resolve) =>
    setTimeout(() => resolve("Hello from serverffff"), 1000)
  );

  return (
    <EnhancedSuspense onSuccess={(data) => <div>{data}</div>}>
      {promise}
    </EnhancedSuspense>
  );
}
