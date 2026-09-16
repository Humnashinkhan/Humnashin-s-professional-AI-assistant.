// import { useEffect, useRef, useState } from "react";


// const CHAT_URL = import.meta.env.VITE_N8N_CHAT_URL;

// function App() {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       role: "assistant",
//       content:
//         "Hi 👋 I'm Humnashin AI. Ask me about Humnashin's experience, skills, projects, education, or AI automation work.",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const messagesEndRef = useRef(null);

//   // Create one session ID for this browser tab/session
//   const getSessionId = () => {
//     let sessionId = sessionStorage.getItem("humnashin_chat_session");

//     if (!sessionId) {
//       sessionId =
//         "chat_" +
//         crypto.randomUUID();

//       sessionStorage.setItem(
//         "humnashin_chat_session",
//         sessionId
//       );
//     }

//     return sessionId;
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     const message = input.trim();

//     if (!message || loading) return;

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         role: "user",
//         content: message,
//       },
//     ]);

//     setInput("");
//     setLoading(true);

//     try {
//       const sessionId = getSessionId();

//       // const response = await fetch(CHAT_URL, {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify({
//       //     action: "sendMessage",
//       //     chatInput: message,
//       //     sessionId,
//       //   }),
//       // });

//       // if (!response.ok) {
//       //   throw new Error(
//       //     `Request failed: ${response.status}`
//       //   );
//       // }

//       // const data = await response.json();

//       // console.log("n8n response:", data);

//       // const answer =
//       //   data.output ||
//       //   data.text ||
//       //   data.response ||
//       //   data.answer ||
//       //   "Sorry, I couldn't generate a response.";

//       // setMessages((prev) => [
//       //   ...prev,
//       //   {
//       //     id: Date.now() + 1,
//       //     role: "assistant",
//       //     content: answer,
//       //   },
//       // ]);
//       const response = await fetch(CHAT_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           action: "sendMessage",
//           chatInput: message,
//           sessionId,
//         }),
//       });

//       console.log("STATUS:", response.status);

//       const raw = await response.text();

//       console.log("N8N RAW RESPONSE:", raw);

//       if (!response.ok) {
//         throw new Error(`n8n ${response.status}: ${raw}`);
//       }

//       let data;

//       try {
//         data = JSON.parse(raw);
//       } catch {
//         data = raw;
//       }

//       console.log("N8N DATA:", data);

//       const answer =
//         typeof data === "string"
//           ? data
//           : data.output ||
//           data.text ||
//           data.response ||
//           data.answer ||
//           data.message ||
//           "n8n returned no answer.";

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           role: "assistant",
//           content: answer,
//         },
//       ]);
//     } catch (error) {
//       console.error(error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           role: "assistant",
//           content:
//             "Sorry, I couldn't connect to the AI assistant.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   const suggestions = [
//     "What are Humnashin's technical skills?",
//     "Tell me about his professional experience.",
//     "What AI automation projects has he built?",
//   ];

//   return (
//     <div className="flex h-screen bg-slate-50">

//       <div className="mx-auto flex h-full w-full max-w-5xl flex-col bg-white shadow-sm">

//         {/* Header */}
//         <header className="border-b border-slate-200 px-6 py-4">
//           <div className="flex items-center justify-between">

//             <div>
//               <h1 className="text-lg font-semibold">
//                 Humnashin AI
//               </h1>

//               <p className="text-sm text-slate-500">
//                 Professional Knowledge Assistant
//               </p>
//             </div>

//             <div className="flex items-center gap-2 text-xs text-slate-500">
//               <span className="h-2 w-2 rounded-full bg-green-500" />
//               Online
//             </div>

//           </div>
//         </header>

//         {/* Messages */}
//         <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">

//           <div className="mx-auto max-w-3xl">

//             {/* Welcome */}
//             {messages.length === 1 && (
//               <div className="mb-8 text-center">

//                 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
//                   ✦
//                 </div>

//                 <h2 className="text-2xl font-semibold">
//                   Humnashin AI
//                 </h2>

//                 <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
//                   Ask me about Humnashin's professional
//                   experience, technical skills, projects,
//                   education, and AI automation work.
//                 </p>

//                 <div className="mt-6 grid gap-2 sm:grid-cols-3">
//                   {suggestions.map((question) => (
//                     <button
//                       key={question}
//                       onClick={() => setInput(question)}
//                       className="rounded-xl border border-slate-200 p-3 text-left text-sm text-slate-600 transition hover:border-violet-300 hover:bg-violet-50"
//                     >
//                       {question}
//                     </button>
//                   ))}
//                 </div>

//               </div>
//             )}

//             {/* Messages */}
//             <div className="space-y-5">

//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.role === "user"
//                       ? "justify-end"
//                       : "justify-start"
//                     }`}
//                 >

//                   <div
//                     className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user"
//                         ? "bg-violet-600 text-white"
//                         : "bg-slate-100 text-slate-700"
//                       }`}
//                   >
//                     {message.content}
//                   </div>

//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
//                     Humnashin AI is thinking...
//                   </div>
//                 </div>
//               )}

//               <div ref={messagesEndRef} />

//             </div>

//           </div>

//         </main>

//         {/* Input */}
//         <footer className="border-t border-slate-200 px-4 py-4 sm:px-8">

//           <div className="mx-auto max-w-3xl">

//             <div className="flex items-end gap-2 rounded-2xl border border-slate-300 p-2 focus-within:border-violet-400">

//               <textarea
//                 value={input}
//                 onChange={(event) =>
//                   setInput(event.target.value)
//                 }
//                 onKeyDown={handleKeyDown}
//                 placeholder="Ask something about Humnashin..."
//                 rows={1}
//                 className="flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none"
//               />

//               <button
//                 onClick={sendMessage}
//                 disabled={!input.trim() || loading}
//                 className="h-10 w-10 rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-40"
//               >
//                 ↑
//               </button>

//             </div>

//             <p className="mt-2 text-center text-xs text-slate-400">
//               Powered by n8n · RAG · Pinecone · Gemini
//             </p>

//           </div>

//         </footer>

//       </div>
//     </div>
//   );
// }

// export default App;



import { useEffect, useRef, useState } from "react";

const CHAT_URL = import.meta.env.VITE_N8N_CHAT_URL;

function App() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi 👋 I'm Humnashin AI. Ask me about Humnashin's experience, skills, projects, education, or AI automation work.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Create/reuse one session ID for this browser tab
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("humnashin_chat_session");

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      sessionStorage.setItem(
        "humnashin_chat_session",
        sessionId
      );
    }

    return sessionId;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const message = input.trim();

    if (!message || loading) return;

    const sessionId = getSessionId();

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      console.log("=================================");
      console.log("Sending message to n8n");
      console.log("CHAT_URL:", CHAT_URL);
      console.log("sessionId:", sessionId);
      console.log("chatInput:", message);

      if (!CHAT_URL) {
        throw new Error(
          "VITE_N8N_CHAT_URL is undefined. Check your .env file."
        );
      }

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          chatInput: message,
          sessionId: sessionId,
        }),
      });

      console.log("n8n HTTP status:", response.status);

      const raw = await response.text();

      console.log("n8n raw response:", raw);

      if (!response.ok) {
        throw new Error(
          `n8n returned ${response.status}: ${raw}`
        );
      }

      let data;

      try {
        data = JSON.parse(raw);
      } catch {
        data = raw;
      }

      console.log("n8n parsed response:", data);

      let answer = "";

      if (typeof data === "string") {
        answer = data;
      } else if (Array.isArray(data)) {
        answer =
          data[0]?.output ||
          data[0]?.text ||
          data[0]?.response ||
          data[0]?.answer ||
          data[0]?.message ||
          "";
      } else {
        answer =
          data.output ||
          data.text ||
          data.response ||
          data.answer ||
          data.message ||
          "";
      }

      if (!answer) {
        console.error(
          "Could not find answer in n8n response:",
          data
        );

        answer =
          "n8n received your message, but no AI response was returned.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error("N8N CONNECTION ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            `Connection error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "What are Humnashin's technical skills?",
    "Tell me about his professional experience.",
    "What AI automation projects has he built?",
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col bg-white shadow-sm">

        {/* Header */}
        <header className="border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">
                Humnashin AI
              </h1>

              <p className="text-sm text-slate-500">
                Professional Knowledge Assistant
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Online
            </div>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-3xl">

            {messages.length === 1 && (
              <div className="mb-8 text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                  ✦
                </div>

                <h2 className="text-2xl font-semibold">
                  Humnashin AI
                </h2>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Ask me about Humnashin's professional
                  experience, technical skills, projects,
                  education, and AI automation work.
                </p>

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {suggestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => setInput(question)}
                      className="rounded-xl border border-slate-200 p-3 text-left text-sm text-slate-600 transition hover:border-violet-300 hover:bg-violet-50"
                    >
                      {question}
                    </button>
                  ))}
                </div>

              </div>
            )}

            <div className="space-y-5">

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
                    Humnashin AI is thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>

        {/* Input */}
        <footer className="border-t border-slate-200 px-4 py-4 sm:px-8">
          <div className="mx-auto max-w-3xl">

            <div className="flex items-end gap-2 rounded-2xl border border-slate-300 p-2 focus-within:border-violet-400">

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask something about Humnashin..."
                rows={1}
                className="flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="h-10 w-10 rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-40"
              >
                ↑
              </button>

            </div>

            <p className="mt-2 text-center text-xs text-slate-400">
              Powered by n8n · RAG · Pinecone · Gemini
            </p>

          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

