
**Prerequisites:**
- Install node v10 or above
- Install local-web-server using npm
`npm i -g local-web-server`

Steps to run this:

- Run the shell using `npm start`
- Build micro-frontend ( https://github.com/Kalpanachaudhry1/Ask-micro-frontend ) using `npm run build`
- cd to build folder in micro-frontend `cd build`
- now run `mkdir mf-ask && mv * mf-ask`  ( This duplicates creating different folders in s3 bucket )
- Serve the microfrontend using `ws --port 3001`
- If you are serving on a different port update it on shell's `embibe-shell/src/setupProxy.js`


## How this POC works

This micro-frontend architecture run on master slave. This is the master repo.
Master Repo mostly contains common app shell ( For example, Authentication, headers or sidebars, Routings etc ).
1. When shell initializes it fetch contracts found on `embibe-shell/src/mfs.ts`
2. Contracts tells us on what route from where should we fetch index.html. path is the route on which iframe url is listed in url key.
3. These are looped in `embibe-shell/src/pages/App/Routes.component.tsx` so that react router should know the routes upfront and SPA is entact.
4. To handle iframes cross site policy and sync history and cookies easily created a proxy in `embibe-shell/src/setupProxy.js`. In simple terms iframe url for /ask is /mf-ask/index.html in mf.ts i.e. localhost:3000/mf-ask/index.html will be redirected to localhost:3001/mf-ask/index.html internally.
5. The iframe can be found inside `components/micro-frontend/micro-frontend`
6. there is a wrapper for post messaging between shell and micro frontend so that there are not too many connections to and fro which can be found at `embibe-shell/src/services/broadcaster.ts` same can be found at micro-frontends as well.