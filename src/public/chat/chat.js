const userlist = document.getElementById('active_users_list');
const roomlist = document.getElementById('active_rooms_list');
const message = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('send_message_btn');
const chatDisplay = document.getElementById('chat');
const search = document.getElementById('search');

let currentRoom = 'global';
const myUsername = sessionStorage.getItem('username');
const myId = sessionStorage.getItem('id');
const socket = io('http://localhost:3333');
let users = [];
let selectedUser = undefined;

// Send message on button click
sendMessageBtn.addEventListener('click', () => {
  if (!selectedUser) {
    return;
  }

  socket.emit('sendMessage', {
    userId: myId,
    mentorId: selectedUser.id,
    content: message.value,
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

socket.on('updateChat', ({ id, content }) => {
  console.log('Displaying user message');

  chatDisplay.innerHTML += `<div class="message_holder ${
    id === myId ? 'me' : ''
  }">
                                <div class="message_box">
                                  <div id="message" class="message">
                                    <span class="message_name">${getUserName(
                                      id
                                    )}</span>
                                    <span class="message_text">${content}</span>
                                  </div>
                                </div>
                              </div>`;

  chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

// Substituir daqui a pouco
socket.on('updateUsers', (usernames) => {
  userlist.innerHTML = '';
  console.log('usernames returned from server', usernames);
  for (var user in usernames) {
    userlist.innerHTML += `<div class="user_card">
                              <div class="pic"></div>
                              <span>${user}</span>
                            </div>`;
  }
});

function changeRoom(room) {
  if (room != currentRoom) {
    socket.emit('updateRooms', room);
  }
}

async function loadChatData() {
  console.log('Buscando data');
  const rawData = await fetch('http://localhost:3333/connect', {
    headers: {
      'Content-Type': 'application/json',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDk5Njg3ODUsImV4cCI6MTY1MjU2MDc4NSwic3ViIjoiNCJ9.thtre6C-vMd2pYQLVklUEjh9_rwUkRg2YYMYwMsUifo',
    },
  });

  console.log('Deu certo');
  console.log(rawData);

  const { connectedUsers } = await rawData.json();

  console.log(connectedUsers);

  users = connectedUsers;

  loadUsers(users);

  selectedUser = users[0];
}

function loadUsers(usersToLoad) {
  usersToLoad.forEach((user) => {
    console.log(user.about.length);
    userlist.innerHTML += `<div class="user_container">
    <img class="image_blue_border" src="../images/user-image-teste.jpg" alt="">
    <div class="name_description">
      <h3 class="user_name">${user.name}</h3>
      <p class="user_description">${
        user.about.length < 169
          ? user.about
          : user.about.substring(0, 140) + '...'
      }</p>
    </div>
  </div>`;
  });
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
