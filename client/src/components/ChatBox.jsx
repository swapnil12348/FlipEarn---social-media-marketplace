import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ChatBox = () => {

    const {listing, isOpen, chatId} = useSelector((state)=>state.chat)

    const user = {id: 'user_2'};

    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false)



  return (
    <div>ChatBox</div>
  )
}

export default ChatBox