import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { gsap } from "gsap";

const ChatBot = () => {
  const robotRef = useRef(null);

  useEffect(() => {
    gsap.to(robotRef.current, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(robotRef.current, {
      rotate: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your AC Assistant. Ask me about products, prices, warranties, installation, or recommendations.",
    },
  ]);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // const sendMessage = async () => {
  //   if (!message.trim()) return;

  //   const userMessage = {
  //     role: "user",
  //     content: message,
  //   };

  //   setMessages((prev) => [...prev, userMessage]);

  //   const query = message;

  //   setMessage("");
  //   setLoading(true);

  //   try {
  //     const { data } = await axios.post(
  //       `${backendUrl}/api/chatbot/ask`,
  //       {
  //         message: query,
  //       },
  //     );

  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "assistant",
  //         content: data.answer,
  //       },
  //     ]);
  //   } catch (error) {
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "assistant",
  //         content: "Sorry, I couldn't process your request.",
  //       },
  //     ]);
  //   }

  //   setLoading(false);
  // };
const sendMessage = async () => {
  if (!message.trim()) return;

  const userMessage = {
    role: "user",
    content: message,
  };

  setMessages((prev) => [...prev, userMessage]);

  const query = message;

  setMessage("");
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    console.log("Chat token exists:", !!token);
    console.log("Chat token length:", token?.length);

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const { data } = await axios.post(
      `${backendUrl}/api/chatbot/ask`,
      {
        message: query,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("Chat response:", data);

    if (!data.success) {
      throw new Error(data.message || "Failed to get chatbot response");
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          data.answer || "I couldn't generate a response.",
      },
    ]);

  } catch (error) {
    console.error("Chat error:", error);
    console.error("Status:", error.response?.status);
    console.error("Server response:", error.response?.data);

    let errorMessage = "Sorry, I couldn't process your request.";

    if (error.message === "Authentication token not found") {
      errorMessage = "Please log in to use the chatbot.";
    } else if (error.response?.status === 401) {
      errorMessage =
        error.response?.data?.message ||
        "Your session has expired. Please log in again.";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: errorMessage,
      },
    ]);
  } finally {
    setLoading(false);
  }
};
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        ref={robotRef}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-[#005AAA] blur-xl opacity-40"></div>

          {/* Robot */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl border-4 border-[#005AAA]">
            <svg viewBox="0 0 100 100" className="h-14 w-14">
              {/* Head */}
              <rect
                x="20"
                y="20"
                width="60"
                height="50"
                rx="12"
                fill="#005AAA"
              />

              {/* Eyes */}
              <circle cx="38" cy="45" r="6" fill="white" />
              <circle cx="62" cy="45" r="6" fill="white" />

              {/* Mouth */}
              <rect x="35" y="58" width="30" height="5" rx="3" fill="white" />

              {/* Antenna */}
              <line
                x1="50"
                y1="20"
                x2="50"
                y2="8"
                stroke="#005AAA"
                strokeWidth="4"
              />

              <circle cx="50" cy="6" r="4" fill="#005AAA" />

              {/* AC Symbol */}
              <text
                x="50"
                y="90"
                textAnchor="middle"
                fontSize="16"
                fill="#005AAA"
                fontWeight="bold"
              >
                AC
              </text>
            </svg>
          </div>
        </div>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-[#005AAA] p-4 text-white">
            <h2 className="text-lg font-semibold">AC Assistant</h2>
            <p className="text-sm opacity-90">
              Ask anything about our AC products
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-[#005AAA] text-white"
                      : "bg-white border shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl border bg-white px-4 py-3 shadow-sm">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about ACs..."
                className="flex-1 rounded-xl border px-3 py-2 outline-none focus:border-blue-500"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="rounded-xl bg-[#005AAA] px-4 py-2 text-white hover:bg-[#004A8C] disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
