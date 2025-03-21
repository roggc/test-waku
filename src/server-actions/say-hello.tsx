//src/server-actions/say-hello.tsx
"use server";

import SayHello from "../components/say-hello";

export function sayHello() {
  const promise = new Promise<string[]>((r) =>
    setTimeout(() => r(["Roger", "Alex"]), 1000)
  );

  return <SayHello promise={promise} />;
}
