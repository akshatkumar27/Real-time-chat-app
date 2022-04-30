import React, { useEffect,useState } from 'react';
import "./chat.css";
import socketIo from 'socket.io-client';
import {user} from '../Join/Join';
import img from "../../images/send.png";
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom"
import close from "../../images/close.png";

let socket;
const ENDPOINT="http://localhost:4500/";

const Chat = () => {
   
  const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    console.log(messages);

  useEffect(()=>{

     socket=socketIo(ENDPOINT,{transports:['websocket']});

    socket.on('connect',()=>{
      alert("connnected");
      setid(socket.id);

    })


    console.log(socket);

    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    socket.on('userJoined',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message)
    })
 
    socket.on('leave', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message)
  })

    return ()=>{
socket.emit('disonnect');
socket.off();
    }
  },[])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message, data.id);
    })
    return () => {
         socket.off();
    }
}, [messages])
  

  return (
    <div className="chatPage">
        <div className="chatContainer">
<div className="header">
  <h2>Chat Buddy</h2>
 <a href='/'> <img src={close} alt="" /></a> 
</div>
<ReactScrollToBottom className="chatBox">
  {
    messages.map((data,i)=>
      <Message user={data.id===id?'':data.user} message={data.message} classs={data.id===id?'right':'left'}></Message>
    )
  }
</ReactScrollToBottom>
<div className="inputBox">
  <input type="text" id='chatInput' />
  <button  onClick={send} className='sendBtn'><img src={img} alt="" /></button>
</div>

{user}
        </div>

    </div>
  )
}

export default Chat