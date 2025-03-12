import { useState, useEffect } from "react";
import { sendMessage, fetchMessages } from "../services/api";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadMessages = async () => {
      const response = await fetchMessages(token);
      setMessages(response.data);
    };
    loadMessages();
  }, [token]);

  const handleSend = async () => {
    await sendMessage(token, { receiver_id: 2, content: messageContent });
    setMessageContent("");
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-2xl">Chat</h2>
      <div className="border p-4 h-64 overflow-y-scroll">
        {messages.map((msg) => (
          <p key={msg.id}><strong>User {msg.sender_id}:</strong> {msg.content}</p>
        ))}
      </div>
      <input type="text" className="border p-2 w-full mt-2" placeholder="Type a message" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
      <button onClick={handleSend} className="bg-blue-500 text-white p-2 w-full mt-2">Send</button>
    </div>
  );
};

export default Chat;
