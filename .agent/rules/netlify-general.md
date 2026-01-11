---
trigger: always_on
---

---
description: Guidelines and best practices for building Netlify projects & sites, including serverless functions, edge functions, functions, storage, and real-world examples
globs: "**/*.{ts,tsx,js,jsx,toml}"
---

<ProviderContext version="1.0" provider="netlify">
  # General

  - the `.netlify` folder is not for user code. It should be added to the .gitignore list
  - avoid adding version numbers to imported code. (for example use `@netlify/functions` and never `@netlify/functions@VERSION`)
  - *NEVER* add CORS headers (such as Access-Control-Allow-Origin) unless user EXPLICITLY asks for them.
  - prefer using `netlify dev` to start dev server unless another dev command is requested by the user

  ---

  # Guidelines

  - There are 4 types of compute systems you can write code for:
    - Serverless functions - usually used for transactional server/api requests.
    - Edge functions - usually used for code that must modify requests before hitting the server or modifying responses before returning to users.
    - Background functions - longer running functions for asynchronous work.
    - Scheduled functions - schedule logic to run on a CRON-based interval.
  - Netlify Blobs is a general object storage that can be used to accomplish state storage, data storage, etc.
  - Netlify Image CDN enables on-demand image transformations without affecting build times or optimizing images upon upload. It optimizes images dynamically based on client capabilities and caches transformations for performance improvements. Use this when optimizing images dynamically. Don't use this when you need to modify an image during the development/build process.
  - Environment variables are available for storing secrets, API keys, and other values that you want to control external to the code or are too sensitive to put in the code.

 ## Environment Variables
  - securely create, manage, and use environment variables across sites. These variables can be set via the UI, CLI, API, or configuration files.
  - when setting environment variables, Netlify local environment and cloud environment will make these variables available.
  - **Precedence**: `netlify.toml` overrides UI/CLI/API variables, and site-specific variables take precedence over shared ones.

  ### Creating Environment Variables
  Variables can be created and managed using:
  - **Netlify UI**: Suggest using if they don't want to provide the values directly to this agent. They can navigate to it via the path "Site configuration > Environment variables".
  - **Netlify CLI**: Prefer using this if the agent can run commands. This requires the site to be linked.
  - **Netlify Configuration (`netlify.toml`)**: Defines variables at the repository level. ONLY use this for environment variables where the site is not linked yet and the values are not sensitive.

  ### Netlify CLI Command
  - The site must be linked first before the CLI will add variables. See the rules for initializing and linking sites for how to do this.
  - Use `env:set` for changes, `env:unset` to delete. `env:import` to import from a dotenv`.env` file.

  #### Example usage of env var CLI
  - Basic setting an environment variable for the site
    ```sh
      netlify env:set API_KEY "not-a-secret"
    ```
  - Setting an environment variable that should be treated as a secret
    ```sh
        netlify env:set API_KEY "secret-value" --secret
    ```

  ### `.env` File Handling
  - Netlify builds do not read `.env` files directly
  - Import `.env` variables into Netlify using the UI or CLI (`netlify env:import .env`).
  - Export Netlify variables to `.env` files via UI or CLI (`env:list`).

  ### Export `.env` Variables
  ```sh
  # list the production deploy context values in .env format
  netlify env:list --plain --context production

  # list the production deploy context values in .env format
  # and pipe results into a .env file
  netlify env:list --plain --context production > .env
  ```

  ---

  # Creating new sites

  - do not add redirects to netlify.toml or _redirects unless requested
  - do not add custom headers to the netlify.toml or _headers unless requested

  # Initializing sites or linking them
  - determine if a site is linked by checking if `PROJECT_FOLDER/.netlify/state.json` file exists and it has a populated `siteId` value.
  - if the site is not linked, run `netlify init` to allow the user to set up the site with Netlify. If the user deploys manually, it will set up the site to use Netlify automatically. If the user decides to set up a repo, they might have to set up the repo first. If the site is already set up on netlify then run `netlify link` for the user to input the credentials to link.


</ProviderContext>