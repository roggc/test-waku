# Waku project

This waku project is a use case where a server action is called from a client component and returns either a client component or a server component. In both cases the app works in local, but when the server action returns a client component the app fails on build/deploy, whereas when the server action returns a server component, the app doesn't fail on build/deploy.

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

This is the code on the ``node_modules/waku/dist/lib/plugins/vite-plugin-rsc-transform.js` where the exception is thrown:

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
