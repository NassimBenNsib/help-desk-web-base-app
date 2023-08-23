"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@/common/components";
import { axios } from "@/common/utils";
import { useRef, useState } from "@/common/hooks";
import { useChatbotStore } from "@/common/stores";
import Typewriter from "typewriter-effect";
import { ChatbotConversationMessageInterface } from "@/common/types";

function Assistant() {
  const { conversations, addConversation } = useChatbotStore();
  const chatBoxRef = useRef(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState<any>({
    content: "",
    type: "received",
    id: 0,
  });

  const sendMessage = () => {
    setLoading(true);
    addConversation({ content: message, type: "sent", id: Date.now() });
    const messageToSend = message;
    setMessage("");
    axios
      .get(`http://localhost:9000/chatbot/${messageToSend}`, {})
      .then((res) => {
        addConversation({
          content: res.data.result,
          type: "received",
          id: Date.now(),
        });
        // setReceivedMessage({
        //   content: res.data.result,
        //   type: "received",
        //   id: Date.now(),
        // });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const handleCompleteAnimationTyping = () => {
    addConversation(receivedMessage);
    setReceivedMessage({
      content: "",
      type: "",
      id: 0,
    });
  };

  return (
    <main className="bg-gray-50 scroll-smooth hover:scroll-auto ">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full max-w-[1700px] mx-auto px-4">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full chatbot-box">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl pt-6 pl-3">
              Virtual Assistant
            </h1>
            <div
              className="flex flex-col h-full overflow-x-auto mb-4"
              ref={chatBoxRef}
            >
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2 pt-24">
                  {loading && (
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white flex-shrink-0">
                          Bot
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>
                            <span className="loading loading-dots loading-sm"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {receivedMessage.content && (
                    <div className="col-start-1 col-end-11 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white flex-shrink-0">
                          Bot
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>
                            <Typewriter
                              onInit={(typewriter) => {
                                typewriter
                                  .changeDelay(20)
                                  .typeString(receivedMessage.content)
                                  .callFunction(() => {
                                    handleCompleteAnimationTyping();
                                  })
                                  .start();
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {conversations.map(
                    (
                      message: ChatbotConversationMessageInterface,
                      index: number
                    ) => {
                      if (message.type === "received") {
                        return (
                          <div
                            className="col-start-1 col-end-11 p-3 rounded-lg"
                            style={{
                              whiteSpace: "pre-wrap",
                            }}
                            key={message.id.toString()}
                          >
                            <div className="flex flex-row items-center">
                              <Avatar className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white flex-shrink-0">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>Bot</AvatarFallback>
                              </Avatar>

                              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{message.content}</div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div
                          className="col-start-3 col-end-13 p-3 rounded-lg"
                          key={message.id.toString()}
                          style={{
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white flex-shrink-0">
                              Me
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div>{message.content}</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <Input
                    value={message}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-primary pl-4 h-10"
                    onChange={handleChangeMessage}
                    onKeyDown={(e: any) => {
                      if (e.code === "Enter") sendMessage();
                    }}
                  />
                </div>
              </div>
              {!loading && !receivedMessage.content && (
                <div className="ml-4">
                  <button
                    disabled={loading || !message}
                    onClick={sendMessage}
                    className="flex items-center justify-center bg-primary hover:bg-primary rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>{loading ? "Thinking...." : "Send"}</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Assistant;
