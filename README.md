# Waku project

This Waku project is a use case where a server action is called from a client component and returns either a client component or a server component. In both cases the app works in local, but when the server action returns a client component the app fails on build/deploy (`waku version 0.21.23`), whereas when the server action returns a server component, the app doesn't fail on build/deploy.

This is the error when fails on deploy (either command `npm run build -- --with-netlify`, `vercel`, or `npx waku build`)

```bash
[rsc-transform-plugin] client id not found: C:/Users/roggc/dev/waku/essay/src/components/say-hello.tsx
file: C:/Users/roggc/dev/waku/essay/src/components/say-hello.tsx
    at getClientId (file:///C:/Users/roggc/dev/waku/essay/node_modules/waku/dist/lib/plugins/vite-plugin-rsc-transform.js:653:15)
    at file:///C:/Users/roggc/dev/waku/essay/node_modules/waku/dist/lib/plugins/vite-plugin-rsc-transform.js:705:51
    at transformServer (file:///C:/Users/roggc/dev/waku/essay/node_modules/waku/dist/lib/plugins/vite-plugin-rsc-transform.js:627:179)
    at Object.transform (file:///C:/Users/roggc/dev/waku/essay/node_modules/waku/dist/lib/plugins/vite-plugin-rsc-transform.js:705:20)
    at Object.handler (file:///C:/Users/roggc/dev/waku/essay/node_modules/vite/dist/node/chunks/dep-glQox-ep.js:51737:15)
    at file:///C:/Users/roggc/dev/waku/essay/node_modules/rollup/dist/es/shared/node-entry.js:21891:40 {
  code: 'PLUGIN_ERROR',
  plugin: 'rsc-transform-plugin',
  hook: 'transform',
  id: 'C:/Users/roggc/dev/waku/essay/src/components/say-hello.tsx',
  watchFiles: [...]
```

This is the code on the `node_modules/waku/dist/lib/plugins/vite-plugin-rsc-transform.js` where the exception is thrown:

```javascript
//...
export function rscTransformPlugin(opts) {
    const getClientId = (id)=>{
        if (opts.isClient) {
            throw new Error('getClientId is only for server');
        }
        if (!opts.isBuild) {
            return id.split('?')[0];
        }
        for (const [k, v] of Object.entries(opts.clientEntryFiles)){
            if (v === id) {
                return k;
            }
        }
        throw new Error('client id not found: ' + id);
    };
    //...
```

A workaround or solution to this problem has been found (for those using `waku` version `0.21.23`). The solution is to import and use the client component returned by server action in a server component, like this:

```typescript
import type { ReactNode } from "react";
import SayHello from "../components/say-hello"; // 1. import the client component returned by server action

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="font-['Nunito']">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <main className="m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center">
        {children}
      </main>
      {/* 2. use like this the component in the layout to fix deploy/build error */}
      {false && <SayHello />}
    </div>
  );
}
// ...
```

This does not affect functionality of the app and fix the deploy/build error.

**The author of the framework has fixed the issue and hence this workaround will be no more necessary in the future. `v0.21.23` fails and needs the workaround. Until the fix it is not published, you can do `npm i https://pkg.csb.dev/wakujs/waku/commit/3017bed9/waku` in a Waku project to use a `waku` version with the fix.**

## Alternative approach

Instead of the Server Action return a Client Component, we can make the Server Action return directly a promise and render the Client Component directly on the tree:

```typescript
//src/components/home-page-client-revisited.tsx
"use client";

import { sayHelloRevisited } from "../server-actions/say-hello-revisited";
import { useState, useEffect } from "react";
import SayHello from "./say-hello";

export default function HomePageClientRevisited() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <SayHello promise={sayHelloRevisited()} /> : null;
}
```

This works and doesn't require the workaround for build/deploy used when the Server Action returns a Client Component. But is a more unstable solution, because ocasional additional errors appears on the browser console, despite working:

```
POST http://localhost:3000/RSC/F/C:/Users/roggc/dev/waku/essay/src/server-actions/say-hello-revisited.tsx/sayHelloRevisited.txt 500 (Internal Server Error)
```

and

```
Uncaught (in promise) Error: Fail on data fetching
    at createCustomError (custom-errors.js?v=0ae991ef:16:17)
    at checkStatus (client.js?v=0ae991ef:26:21)
```

This has to do with the caveat found in the React documentation regarding `use` function:

```
Prefer creating Promises in Server Components and passing them to Client Components over creating Promises in Client Components. Promises created in Client Components are recreated on every render. Promises passed from a Server Component to a Client Component are stable across re-renders.
```
