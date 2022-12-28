import { Configuration, OpenAIApi } from "openai";

import { env } from "../../env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var openAIApi: OpenAIApi | undefined;
}

const configuration: Configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY 
})

export const openAIApi = 
  global.openAIApi ||
  new OpenAIApi(configuration)


if (env.NODE_ENV !== "production") {
  global.openAIApi = openAIApi;
}