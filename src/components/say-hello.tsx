//src/components/say-hello.tsx
//"use client"; //<--- Commenting this line, it doesn't fail on deploy/build

import SuspenseWithUse from "./suspense-with-use";

export default function SayHello({ promise }: { promise: Promise<string[]> }) {
  return (
    <>
      <div>hey</div>
      <div>
        <SuspenseWithUse fallback="Loading###" promise={promise}>
          {(data) => data.map((item) => <div key={item}>{item}</div>)}
        </SuspenseWithUse>
      </div>
    </>
  );
}
