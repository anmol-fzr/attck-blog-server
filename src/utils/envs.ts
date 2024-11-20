const env = process.env;

const envs = Object.freeze({
  isDev: env.MODE === "DEV",

  PORT: env.PORT ?? 3000,
  MONGO_URI: env.MONGO_URI ?? "",
});

export { envs };
