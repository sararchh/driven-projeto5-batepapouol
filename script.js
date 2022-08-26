let userFormatted;
let participants;

let message;
let messagePrivate;
let messagePublico;
let messages = [];

let user;
let statusOn;

let checkParticipant;

function redirectToHome() {
  const button = document.querySelector(".buttonLogin");
  const login = document.querySelector(".container");
  const home = document.querySelector(".containerHome");

  login.classList.add('hideLogin');
  home.classList.add('showChat');

  setInterval(searchMessage, 3000);
  setInterval(searchParticipants, 10000);
  searchParticipants()

}


function redirectError() {
  alert('Digite nome válido, pois este digitado já está em uso');
}


function logarChat() {
  const user = document.querySelector(".inputLogin").value;
  const button = document.querySelector("buttonLogin");

  userFormatted = {
    name: user
  }

  const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userFormatted);

  promisse.then(redirectToHome);
  promisse.catch(redirectError);

  setInterval(keepConnected, 5000);

}

function keepConnected() {
  const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userFormatted);
  promisse.catch(redirectError);
}

// SCRIPT HOME



function showModal() {
  modal = document.querySelector('.navbar');

  modal.classList.toggle('hideMenu');
}

function checkItemVisibility(elementIcon) {
  const itemSelected = document.querySelector('.liVisibility .showIconCheck')

  if (itemSelected !== null) {
    itemSelected.classList.remove('showIconCheck');
  }
  elementIcon.childNodes[3].classList.add('showIconCheck');

  statusOn = elementIcon.innerText.toLowerCase();
}

function checkItemParticipant(elementIcon) {
  const itemSelected = document.querySelector('.liParticipant .showIconCheck')

  if (itemSelected !== null) {
    itemSelected.classList.remove('showIconCheck');
  }
  elementIcon.childNodes[3].classList.add('showIconCheck');

  checkParticipant = elementIcon;
  user = elementIcon.innerText;
}

//buscar participantes
function searchParticipants() {
  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
  promisse.then(getParticipants);
}

function getParticipants(response) {
  participants = response.data;

  renderParticipants();
}

function renderParticipants() {
  const ul = document.querySelector('.participants');

  ul.innerHTML = `
  <li class="liParticipant" onclick="checkItemParticipant(this)">
     <div class="card">
      <ion-icon name="people"></ion-icon>
      <p class="textUser"> Todos </p>
    </div>
  <ion-icon name="checkmark-sharp" class="checkmark-outline"></ion-icon>
  </li>
  `;

  for (let i = 0; i <= 5; i++) {

    ul.innerHTML = ul.innerHTML + `
    <li data-identifier="participant" class="liParticipant" onclick="checkItemParticipant(this)">
    <div class="card">
      <ion-icon name="person-circle"></ion-icon>
      <p class="textUser"> ${participants[i].name} </p>
      </div>
    <ion-icon name="checkmark-sharp" class="checkmark-outline"></ion-icon>
  </li>
    `
  }

}

//buscar messagens
function searchMessage() {
  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promisse.then(getMessages)
  promisse.catch(() => {
    console.log('erro ao buscar')
  })
}

function getMessages(response) {
  messages = response.data;

  renderMessages();
}


function renderMessages() {
  const ul = document.querySelector('.chatMessages');
  const li = document.querySelector('.chatMessages li');

  ul.innerHTML = '';

  for (let i = 0; i < messages.length; i++) {

    // && messages[i].to == userFormatted.name TO DO
    if (messages[i].type == "private_message") {
      ul.innerHTML = ul.innerHTML + `
      <li class="messagePrivate">
        <p> <span>${messages[i].time}</span> <strong>${messages[i].from}</strong> para <strong>${messages[i].to} </strong> ${messages[i].text}</p>
      </li>
  `;

    } else if (messages[i].type == "message") {
      ul.innerHTML = ul.innerHTML + `
        <li class="messageChat">
          <p> <span>${messages[i].time}</span> <strong>${messages[i].from}</strong> para <strong>${messages[i].to} </strong> ${messages[i].text}</p>
        </li>
    `;

    } else {
      ul.innerHTML = ul.innerHTML + `
      <li>
        <p><span>${messages[i].time}</span> <strong>${messages[i].from}</strong> entra na sala...</p>
     </li>
      `;
    }
  }
}

renderMessages();

//enviar mensagens
function postMessages() {
  const input = document.querySelector('.inputMessage').value;

  message = {
    from: userFormatted.name,
    to: "Todos",
    text: input,
    type: "message"
  }

  messagePublico = {
    from: userFormatted.name,
    to: user,
    text: input,
    type: "message"
  }
  // ou "private_message" para o bônus
  // let user;
  // let statusOn;

  messagePrivate = {
    from: userFormatted.name,
    to: user,
    text: input,
    type: "private_message"
  }


  console.log('teste', user)

  if (user != undefined && statusOn == 'reservadamente') {
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messagePrivate);
    promisse.then(submitMessages)
    promisse.catch(() => {
      console.log('error')
    })
  } else if (user != undefined && statusOn == 'público') {
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messagePublico);
    promisse.then(submitMessages)
    promisse.catch(() => {
      console.log('error')
    })
  } else {
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
    promisse.then(submitMessages)
    promisse.catch(() => {
      console.log('error')
    })
  }
}


function submitMessages() {
  renderMessages();
}