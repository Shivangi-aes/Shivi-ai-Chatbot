const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const imageInput = document.getElementById("image-input");

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotReply(message) {
  appendMessage("bot", "Typing...");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });
  const data = await response.json();
  document.querySelector(".message.bot:last-child").remove();
  appendMessage("bot", data.choices[0].message.content);
}

sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text) {
    appendMessage("user", text);
    userInput.value = "";
    getBotReply(text);
  }
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

micBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendBtn.click();
  };
});



  
