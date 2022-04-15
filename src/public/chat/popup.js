const button = document.getElementById('popup_button');
const chat = document.getElementById('popup_chat');
let state = false;

function handlePopUpChat() {
  state = !state;
  if (state) {
    chat.classList.remove('chatbox');
    return;
  }

  chat.classList.add('chatbox');
}

button.onclick = handlePopUpChat;
