import React, { useEffect, useEffectEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dummyChats } from "../assets/assets";
import { Loader2Icon, Send, X } from "lucide-react";
import { clearChat } from "../app/features/ChatSlice";
import { format } from "date-fns";

const Chatbox = () => {
  const { listing, isOpen, chatId } = useSelector((state) => state.chat);

  const user = { id: "user_2" };
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  // States
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Functions
  const fetchChat = async () => {
    setChat(dummyChats[0]);
    setMessages(dummyChats[0].messages);
    setIsLoading(false);
  };

  useEffect(() => {
    if (listing) {
      fetchChat();
    }
  }, [listing]);

  useEffect(() => {
    if (!isOpen) {
      setChat(null);
      setMessages([]);
      setIsLoading(true);
      setNewMessage("");
      setIsSending(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        chatId: chat.id,
        sender_id: user.id,
        message: newMessage,
        createdAt: new Date(),
      },
    ]);
    setNewMessage("");
  };

  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-100 flex items-center justify-center sm:p-4">
      <div className="bg-white sm:rounded-lg shadow-2xl w-full max-w-2xl h-screen sm:h-150 flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-indigo-400 text-white p-4 sm:rounded-t-lg flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{listing?.title}</h3>
            <p className="text-sm text-indigo-100 truncate">
              {user.id === listing.ownerId
                ? `Chatting with buyer (${
                    chat?.chatUser?.name || "Loading..."
                  })`
                : `Chatting with seller (${
                    chat?.ownerUser?.name || "Loading..."
                  })`}
            </p>
          </div>
          <button className="ml-4 p-1 hover:bg-white/20 hover:bg-opacity-20 rounded-lg transition-colors">
            <X onClick={() => dispatch(clearChat())} className="w-5 h-5" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-100">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2Icon className="animate-spin size-6 text-indigo-600" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-neutral-500 mb-2">No messages yet</p>
                <p className="text-sm text-gray-400">
                  Start the conversation...
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                className={`flex ${
                  message.sender_id === user.id
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={message.id}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 pb-1 ${
                    message.sender_id === user.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-neutral-200 text-neutral-800"
                  }`}
                >
                  <p className="text-sm wrap-break-word whitespace-pre-wrap">
                    {message.message}
                  </p>
                  <p
                    className={`text-[10px] mt-1 ${
                      message.sender_id === user.id
                        ? "text-indigo-200"
                        : "text-gray-400"
                    }`}
                  >
                    {format(new Date(message.createdAt), "MMM dd '-' h:mm a")}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Input Area to type messages */}
        {chat?.listing?.status === "active" ? (
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-200 rounded-b-lg"
          >
            <div className="flex items-end space-x-2">
              <textarea
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                rows={1}
                placeholder="Type message here..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:outline-indigo-500 max-h-32"
              />
              <button
                disabled={!newMessage.trim() || isSending}
                type="submit"
                className="bg-indigo-600  text-white hover:bg-indigo-700 p-2.5 rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center "
              >
                {isSending ? (
                  <Loader2Icon className="animate-spin w-5 h-5" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            <p className="text-sm text-neutral-600 text-center">
              {chat ? `Listing is ${chat?.listing?.status}` : "Loading Chat..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
