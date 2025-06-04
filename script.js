async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  const chatBox = document.getElementById("chat-box");

  chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
  document.getElementById("user-input").value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }]
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    chatBox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<p><strong>Bot:</strong> Sorry, I couldn’t reach the server 😞</p>`;
    console.error("API Error:", error);
  }
}
