const userlist = document.getElementById('active_users_list');
const roomlist = document.getElementById('active_rooms_list');
const message = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('send_message_btn');
const chatDisplay = document.getElementById('chat');
const search = document.getElementById('search');

let currentRoom = 'global';
const myUsername = localStorage.getItem('username');
const myId = parseInt(localStorage.getItem('id'));
const socket = io('http://localhost:3333');
let users = [];
let selectedUser = undefined;
const token = localStorage.getItem('token');

// Send message on button click
sendMessageBtn.addEventListener('click', () => {
  if (!selectedUser) {
    return;
  }

  socket.emit('sendMessage', {
    mentorId: selectedUser.id,
    content: message.value,
    token: token,
  });
  message.value = '';
});

search.addEventListener('change', updateUserList);

// Send message on enter key press
message.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessageBtn.click();
  }
});

// Prompt for username on connecting to server
socket.on('connect', () => {
  console.log('Connected');
});

socket.on('updateChat', ({ userId, content }) => {
  console.log('Displaying user message');
  console.log(userId === myId);

  chatDisplay.innerHTML += `<div class="message_holder ${
    userId === myId ? 'me' : ''
  }">
                                <div class="message_box">
                                  <div id="message" class="${
                                    userId === myId ? 'my_message' : 'message'
                                  }">
                                    <span class="message_text">${content}</span>
                                  </div>
                                </div>
                              </div>`;

  chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

socket.on('invalidToken', () => {
  window.location.replace('/');
  //localStorage.clear()
});

function changeRoom(room) {
  if (room != currentRoom) {
    socket.emit('updateRooms', room);
  }
}

async function loadChatData() {
  const fetchProps = {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  };

  const rawData = await fetch('http://localhost:3333/connect', fetchProps);

  const { connectedUsers } = await rawData.json();

  users = connectedUsers;

  loadUsers(users);

  selectedUser = users[0];

  changeUser(0);
}

function loadUsers(usersToLoad) {
  let x = 0;
  usersToLoad.forEach((user) => {
    console.log(user.about.length);
    userlist.innerHTML += `<div id="user-${x}" class="user_container" onclick="changeUser(${x})">
    <img id="user-image-${x}" class="image_blue_border" src="../images/user-image-teste.jpg" alt="">
    <div class="name_description">
      <h3 class="user_name">${user.name}</h3>
      <p class="user_description">${
        user.about.length < 143
          ? user.about
          : user.about.substring(0, 140) + '...'
      }</p>
    </div>
  </div>`;
    x++;
  });
}

function changeUser(id) {
  const oldUser = document.getElementById(
    'user-' + users.indexOf(selectedUser).toString()
  );
  const oldUserImage = document.getElementById(
    'user-image-' + users.indexOf(selectedUser).toString()
  );
  oldUser.classList.remove('user_orange_border');
  oldUserImage.classList.remove('image_orange_border');

  const user = document.getElementById('user-' + id);
  const userImage = document.getElementById('user-image-' + id);
  user.classList.add('user_orange_border');
  userImage.classList.add('image_orange_border');

  selectedUser = users[id];

  const activeUser = document.getElementById('active_user');
  const activeDescription = document.getElementById('activer_description');
  activeUser.innerHTML = selectedUser.name;
  activeDescription.innerHTML = selectedUser.jobTitle;

  updateChat();
  console.log(id);
}

loadChatData();

function updateUserList() {
  console.log(search.value);

  userlist.innerHTML = '';

  searchUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.value.toLowerCase())
  );

  console.log(searchUsers);

  loadUsers(searchUsers);
}

console.log('Hihihi  :', document);

function getUserName(id) {
  const messageUser = users.find((user) => user.id === id);

  if (!messageUser) {
    return myUsername;
  }

  return messageUser.name;
}

function updateChat() {
  console.log(selectedUser);
  chatDisplay.innerHTML = '';
  selectedUser.messages.forEach(({ senderId, content }) => {
    console.log(senderId);
    chatDisplay.innerHTML += `<div class="message_holder ${
      senderId === myId ? 'me' : ''
    }">
                                  <div class="message_box">
                                    <div id="message" class="${
                                      senderId === myId
                                        ? 'my_message'
                                        : 'message'
                                    }">
                                      <span class="message_text">${content}</span>
                                    </div>
                                  </div>
                                </div>`;
  });
}
