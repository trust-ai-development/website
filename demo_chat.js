async function getReply() {
    let userInput = document.getElementById('user-input').value;
    document.getElementById('chat-log').innerHTML += 'User: ' + userInput + '\n';

    var settings = {
        "url": "https://api.openai.com/v1/chat/completions",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": ""
        },
        "data": JSON.stringify({
            "prompt": userInput,
            "max_tokens": 100
        })
    };

    $.ajax(settings).done(function (response) {
        document.getElementById('chat-log').innerHTML += 'Bot: ' + response.choices[0].text.trim() + '\n';
    });

    document.getElementById('user-input').value = '';

