---
trigger: always_on
---

---
description: Guidelines and best practices for building Netlify projects & sites, including serverless functions, edge functions, functions, storage, and real-world examples
globs: "**/*.{ts,tsx,js,jsx,toml}"
---

<ProviderContext version="1.0" provider="netlify">
## Netlify compute


  - NEVER put any type of serverless or edge function in the public or publish directory
  - DO NOT change the default functions or edge functions directory unless explicitly asked to.
  - ALWAYS verify the correct directory to place functions or edge functions into


  ### Context object for serverless functions and edge functions


  Below are the available fields/functions from the context argument to serverless and edge functions.


  ```
  {
    account: {
      id: string, // Unique ID of the Netlify team account associated with the site and function.
    },
    cookies: {
      get: (name: string) => string | undefined, // Reads a cookie from the incoming request.
      set: (options: { name: string; value: string; path?: string; domain?: string; secure?: boolean; httpOnly?: boolean; expires?: Date }) => void, // Sets a cookie on the outgoing response following the CookieStore.set web standard.
      delete: (nameOrOptions: string | { name: string; path?: string; domain?: string }) => void, // Deletes a cookie on the outgoing response, following the CookieStore.delete web standard.
    },
    deploy: {
      context: string, // The deploy context (e.g., production, deploy-preview).
      id: string, // Unique ID of the deploy the function belongs to.
      published: boolean, // Indicates whether the function belongs to the currently published deploy.
    },
    geo: {
      city: string, // City name of the client location.
      country: {
        code: string, // ISO 3166 country code.
        name: string, // Full country name.
      },
      latitude: number, // Latitude coordinate of the client location.
      longitude: number, // Longitude coordinate of the client location.
      subdivision: {
        code: string, // ISO 3166 subdivision code (e.g., state or province).
        name: string, // Subdivision name.
      },
      timezone: string, // Timezone of the location.
      postalCode: string, // Postal code of the location in its regional format.
      ip: string, // Client IP address.
    },
    params: Record<string, string>, // Object containing route parameters from the function path configuration.
    requestId: string, // Unique Netlify request ID.
    server: {
      region: string, // The region code where the deployment is running (e.g., us-east-1).
    },
    site: {
      id: string, // Unique ID for the Netlify site.
      name: string, // The site's Netlify subdomain name.
      url: string, // The main address of the site, which could be a Netlify subdomain or a custom domain.
    },
  }
  ```


  ### the `Netlify` global object


  - the `Netlify` object is available in global scope.
  - available on all serverless and edge function types


  It has the following fields/functions:


  ```
  {
    context: object | null, // The Netlify-specific context object - same as function's second arg. Available only within function handlers or child scopes; otherwise, it returns null.


    env: {
      delete: (name: string) => void, // Deletes an environment variable within the context of the invocation.
      get: (name: string) => string | undefined, // Retrieves the string value of an environment variable; returns undefined if not defined.
      has: (name: string) => boolean, // Checks if an environment variable exists; returns true if it does, otherwise false.
      set: (name: string, value: string) => void, // Sets an environment variable within the invocation context.
      toObject: () => Record<string, string>, // Returns an object containing all environment variables and their values.
    },
  };
  ```


  ### Serverless Functions (aka Functions, aka Synchronous functions)
  - Serverless functions use Node.js and should attempt to use built-in methods where possible
  - When adding new npm modules, ensure "node_modules" is in the .gitignore
  - ALWAYS use the latest format of a function structure.
  - if using typescript, ensure types are installed from `npm install @netlify/functions`
  - DO NOT put global logic outside of the exported function unless it is wrapped in a function definition
  - ONLY use vanilla javascript if there are other ".js" files in the functions directory.
  - ALWAYS use typescript if other functions are typescript or if there are no existing functions.
  - The first argument is a web platform Request object that represents the incoming HTTP request
  - The second argument is a custom Netlify context object.
  - Functions have a global `Netlify` object that is also accessible.
    - ONLY use `Netlify.env.*` for interacting with environment variables in code.
  - Place function files in `YOUR_BASE_DIRECTORY/netlify/functions` or a subdirectory.
    - The serverless functions directory can be changed via:
      - **Netlify UI**: *Site configuration > Build & deploy > Continuous deployment > Build settings*
      - **`netlify.toml`**:
        ```toml
        [functions]
          directory = "my_functions"
      ```
    - `netlify.toml` settings override UI settings.
  - If using a subdirectory, name the entry file `index.mts` or match the subdirectory name.
    - Example valid function paths:
      - `netlify/functions/hello.mts`
      - `netlify/functions/hello/index.mts`
      - `netlify/functions/hello/hello.mts`
  - Naming files with `.mts` enables modern ES module syntax


  #### Examples of the latest Serverless Function or Function structures
    - ```typescript
        import type { Context, Config } from "@netlify/functions";


        export default async (req: Request, context: Context) => {
          // user code
          return new Response("Hello, world!")
        }


        export const config: Config = {
          // use this path instead of /.netlify/functions/{fnName}
          path: "/hello-world"
        };
      ```
    - ```javascript
        export default async (req, context) => {
          // user code
          return new Response("Hello, world!")
        }


        export const config = {
        // use this path instead of /.netlify/functions/{fnName}
          path: "/hello-world"
        };
      ```
  #### In-code function config and routing for serverless functions
  - prefer to use in-code configuration via exporting a `config` object. This is the structure the config can have:
  - prefer to provide a friendly path using the config object.
  - ONLY serverless functions use `/.netlify/functions/{function_name}` path by default.
  - If you set a specific path via this config or the netlify.toml, it will only be available at that new path.
  - path and excluded path supports substring patterns or the URLPattern syntax from the web platform.


  ```
  {
    path: string | string[], // Defines the URL path(s) that trigger the function. Can be a single string or an array of paths.
    excludedPath?: string | string[], // Optional. Defines paths that should be excluded from triggering the function.
    preferStatic?: boolean, // Optional. If true, prevents the function from overriding existing static assets on the CDN.
  }
  ```


  ### Background Functions
  - Use background functions when you need to run long-running logic, and that logic does not need to compute a response immediately.
  - Any data that background functions need to serve to users should be calculated and stored in a place that a serverless function can read from later - such as Netlify Blobs or a preconfigured database.
  - Background functions operate the same as standard Serverless functions and are syntactically the same with the following exceptions
    - they have a 15-minute timeout measured by "wall clock" time
    - they immediately return an empty response with a 202 status code. Return values from these functions are ignored.
    - Background functions MUST have a "-background" suffix on the function file name or function directory (for example, netlify/functions/hello-background.mts or netlify/functions/hello-background/index.mts).


  #### Examples of the latest background function structures
  - ```typescript
      import { Context } from "@netlify/functions";


      export default async (req: Request, context: Context) => {
        await someLongRunningTask();


        console.log("Done");
      };
    ```


  - ```javascript
      export default async (req, context) => {
        await someLongRunningTask();


        console.log("Done");
      };
    ```


  ### Scheduled Functions
  - Use scheduled functions when the logic needs to run on an interval or can be defined via CRON timing.
  - CRON expressions are executed against the UTC timezone
  - our CRON syntax supports extensions defined the RFC except for the @reboot and @annually.
  - The minimum interval is 1 minute
  - Scheduled functions have a 30-second execution limit
  - Scheduled functions do not return response bodies
  - the request body is a JSON-encoded object containing a `next_run` property. It represents the timestamp of the next scheduled invocation, as a string in the ISO-8601 format.
  - in addition to in-code config, schedules can be defined in the `netlify.toml`. ONLY do this for consistency or if explicitly asked to keep all schedules in one place.
    ```toml
      [functions."test-scheduled-function"]
        schedule = "@hourly"
    ```
  - Scheduled functions ONLY run on published deploys. They donâ€™t run on Deploy Previews or branch deploys.
  - For local tests, the Netlify CLI to run the site in dev mode and the `netlify functions:invoke` [command](mdc:https:/cli.netlify.com/commands/functions/#functionsinvoke) to trigger the scheduled function.
    example:
    ```bash
      netlify functions:invoke myfunction
    ```


  #### Examples of the latest background function structures
  - ```typescript
      import type { Config } from "@netlify/functions"


      export default async (req: Request) => {
          const { next_run } = await req.json()


          console.log("Received event! Next invocation at:", next_run)
      }


      export const config: Config = {
          schedule: "@hourly"
      }


    ```


  - ```javascript
      export default async (req) => {
          const { next_run } = await req.json()


          console.log("Received event! Next invocation at:", next_run)
      }


      export const config = {
          schedule: "@hourly"
      }


    ```

</ProviderContext>