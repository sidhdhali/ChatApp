// import React from 'react'
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendmessage from "../../hooks/useSendMessage.js";


const MessageInput = () =>
{
  const [message, setMessage] = useState("");

  const { loading, sendMessage } = useSendmessage();

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input type="text" className="border text-sm rounded-g block w-full p-2.5 bg-gray-600 border-gray-600 text-white" placeholder="Send a Message" />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
