const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');
const sendButton = document.getElementById('send-button');
const keyInput = document.getElementById('key-input');

// Function to send request to openAI
async function sendRequest(message, key) {
    
    let dialogue = [
      {
        "role": "system",
        "content": "you are a knowledgeable expert on all things. you answer questions concisely and quickly. when answering programming questions, if possible try to give an in-built function or solution rather than an explicit algorithm"
      },
      {
        "role": "user",
        "content": message
      }
    ];
    let data = {"model":"gpt-3.5-turbo", "messages":dialogue, "n":1, "temperature":0.7}
    let jsonStr = JSON.stringify(data);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: jsonStr
    });
    const data = await response.json();
    return data.choices[0].message;
}

// Function to handle enter key and button click
function handleMessageSend() {
    const message = userInput.value;
    const key = keyInput.value;
    userInput.value = '';

    if (message.trim() !== '') {
        sendRequest(message, key)
            .then(response => {
                chatLog.value += `You: ${message}\nLLM: ${response}\n`;
            });
    }
}

// Event listeners
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleMessageSend();
    }
});

sendButton.addEventListener('click', handleMessageSend);
