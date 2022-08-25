let userFormatted;

// function fetchData(){
//   const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
// }


function redirectToHome() {
  const button = document.querySelector(".buttonLogin");
  const login = document.querySelector(".container");
  const home = document.querySelector(".containerHome");

  login.classList.add('hideLogin');
  home.classList.add('showChat');

  searchMessage();
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

  setTimeout(keepConnected, 5000);
  
}

function keepConnected() {
  const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userFormatted);
  promisse.catch(redirectError);
}

// SCRIPT HOME

let messages = [];

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
}

function checkItemParticipant(elementIcon) {
  const itemSelected = document.querySelector('.liParticipant .showIconCheck')

  if (itemSelected !== null) {
    itemSelected.classList.remove('showIconCheck');
  }
  elementIcon.childNodes[3].classList.add('showIconCheck');
}

//buscar messagens
function searchMessage() {
  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promisse.then(getMessages)
  promisse.catch(()=>{
    console.log('erro ao buscar')
  })
}

function getMessages(response) {
  messages = response.data;
  console.log('teste', response.data)

  renderMessages();
}


function renderMessages() {
  const ul = document.querySelector('.chatMessages');
  

  // if(!ul) return;

  ul.innerHTML = '';
  console.log('list', messages)

  for (let i = 0; i < messages.length; i++) {

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

renderMessages()



