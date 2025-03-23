//src/components/say-hello.tsx
"use client";

import { EnhancedSuspense } from "react-enhanced-suspense";

export default function SayHello({ promise }: { promise?: Promise<string[]> }) {
  return (
    <>
      <div>Hey</div>
      <div>
        <EnhancedSuspense
          onSuccess={(data) => data.map((item) => <div key={item}>{item}</div>)}
        >
          {promise}
        </EnhancedSuspense>
      </div>
    </>
  );
}
