let userFormatted;
let participants;
let messages = [];



function redirectToHome() {
  const button = document.querySelector(".buttonLogin");
  const login = document.querySelector(".container");
  const home = document.querySelector(".containerHome");

  login.classList.add('hideLogin');
  home.classList.add('showChat');

  setInterval(searchMessage, 3000);
  // setInterval(searchParticipants, 10000);
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
  console.log('teste2',elementIcon.childNodes[3])


}

function checkItemParticipant(elementIcon) {
  const itemSelected = document.querySelector('.liParticipant .showIconCheck')
  console.log('teste',elementIcon.childNodes[3])

  if (itemSelected !== null) {
    itemSelected.classList.remove('showIconCheck');
  }
  elementIcon.childNodes[3].classList.add('showIconCheck');
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
        Todos
    </div>
  <ion-icon name="checkmark-sharp" class="checkmark-outline"></ion-icon>
  </li>
  `;

  for (let i = 0; i == participants <= 10; i++) {

    ul.innerHTML = ul.innerHTML + `
    <li data-identifier="participant" class="liParticipant" onclick="checkItemParticipant(this)">
    <div class="card">
      <ion-icon name="person-circle"></ion-icon>
      ${participants[i].name}
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

  ul.innerHTML = '';

  for (let i = 0; i < messages.length; i++) {


    if (messages[i].type == "private_message" && messages[i].to == userFormatted.name) {
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

renderMessages()



