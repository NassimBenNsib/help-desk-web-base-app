import { APP_CONFIG, CHATBOT_CONFIG, CORS_CONFIG } from "../config";
import { data } from "../data";
import { ChatGPTAPI } from "./core";
import { default as cors, CorsOptions } from "cors";
import { default as express, Response, Request } from "express";
import { oraPromise } from "ora";

const chatbot = express();
const corsOptions: CorsOptions = {
  origin: CORS_CONFIG.ORIGINS,
  methods: CORS_CONFIG.METHODS,
  allowedHeaders: CORS_CONFIG.ALLOWED_HEADERS,
};
chatbot.use(express.json());
chatbot.use(express.urlencoded({ extended: true }));
chatbot.use(cors(corsOptions));

const api = new ChatGPTAPI({
  apiKey: CHATBOT_CONFIG.API_KEY as string,
  debug: false,
});

const command = (prompt: string) => {
  return (
    `act as a virtual assistant on your helpdesk, providing efficient and user-friendly assistance to your clients. You can create suitable prompts to enable your customers to interact seamlessly with me as a virtual assistant, chatbot, or digital guide` +
    `so base in this"` +
    data +
    `" answer like virtual assistant depend in entred data in other case you must to say yhat you don't know or you don't understand` +
    "answer this question : " +
    prompt
  );
};

chatbot.get(
  "/chatbot/:prompt",
  async (request: Request, response: Response) => {
    try {
      if (!request.params.prompt)
        return response.status(400).json({
          code: 400,
          title: "Bad Request",
          message: "Missing required parameter 'prompt'",
          description: "Missing required parameter 'prompt'",
          hint: "Please provide a prompt to generate a response",
          result: null,
        });
      console.log(request.params);
      const { prompt } = request.params;

      const result = await oraPromise(
        api.sendMessage(command(prompt), {
          // onProgress(partialResponse) {
          //   response.write(partialResponse.text);
          // },
        }),
        {
          text: "Generating response",
          // stream: response,
        }
      );
      // response.end();
      return response.status(200).json({
        code: 200,
        title: "OK",
        message: "Success",
        description: "Successfully generated response",
        hint: "Successfully generated response",
        result: result.text,
      });
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        title: "Internal Server Error",
        message: "Something went wrong",
        description: error.message,
        hint: "Please try again later",
        result: null,
      });
    }
  }
);

chatbot.listen(APP_CONFIG.PORT, () =>
  console.log(`Server listening on port ${APP_CONFIG.PORT}`)
);
