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
  fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  })
  .then(res => res.json())
  .then(data => appendMessage("bot", data.reply))
  .catch(err => appendMessage("bot", "Sorry, something went wrong."));

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



  
