//src/server-actions/say-hello.tsx
"use server";

import SayHello from "../components/say-hello";

export function sayHello() {
  const promise = new Promise<string[]>((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(["Roger", "Alex"]);
      } else {
        reject("Fail on data fetching");
      }
    }, 1000)
  );

  return <SayHello promise={promise} />;
}
