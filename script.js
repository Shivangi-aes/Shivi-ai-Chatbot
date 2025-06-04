document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    // Show user message
    chatBox.innerHTML += `<div class="user">You: ${message}</div>`;
    input.value = "";

    // Simulate AI response
    setTimeout(() => {
      let response = getBotReply(message);
      chatBox.innerHTML += `<div class="bot">Shivi AI: ${response}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
  });

  function getBotReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! I'm your chatbot 🤖";
    } else if (msg.includes("name")) {
      return "My name is Shivi AI!";
    } else {
      return "I'm still learning! 🧠";
    }
  }
});

 
