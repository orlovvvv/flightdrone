interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /**
   * Built-in environment variable.
   * @see Docs https://github.com/chihab/dotenv-run/packages/angular#node_env.
   */
  readonly NODE_ENV: string;
  // Add your environment variables below
  // readonly NG_APP_API_URL: string;
  readonly NG_APP_API_KEY: string;
  readonly NG_APP_ENDPOINT: string;
  readonly NG_APP_PORJECT_ID: string;
  readonly NG_APP_WEATHER_SERCRET: string;
  readonly NG_APP_DATABASE_ID: string;
  readonly NG_APP_PROFILE_COLLECTION: string;
  readonly NG_APP_FLIGHT_COLLECTION: string;
  readonly NG_APP_DRONE_COLLECTION: string;
  [key: string]: any;
}

/*
 * Remove all the deprecated code below if you're using import.meta.env (recommended)
 */
