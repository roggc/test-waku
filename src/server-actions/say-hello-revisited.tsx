//src/server-actions/say-hello.tsx
"use server";

export function sayHelloRevisited() {
  const promise = new Promise<string[]>((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(["Roger", "Alex"]);
      } else {
        reject("Fail on data fetching");
      }
    }, 1000)
  );

  return promise;
}
