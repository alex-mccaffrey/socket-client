import React, { useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";

function Chat() {
  const [inputText, setInputText] = useState();

  var socket = io();

  var messages = document.getElementById("messages");
  var input = document.getElementById("input");


  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const updateMessages = (msg) => {
    var item = document.createElement("li");
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText) {
      socket.emit("chat message", inputText);
      setInputText("");
      input.value = "";
    }
    socket.on("chat message", updateMessages(inputText))
  };

 

  return (
    <div>
      <ul id="messages"></ul>
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          id="input"
          autoComplete="off"
          type="text"
          name="text"
          onChange={handleChange}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Chat;
