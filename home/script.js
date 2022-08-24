let messages = [];

function showModal() {
  modal = document.querySelector('.navbar');

  modal.classList.toggle('hideMenu');
}

function checkItemVisibility(elementIcon) {

  const itemSelected = document.querySelector('.liVisibility .showIconCheck')

  if(itemSelected !== null){
    itemSelected.classList.remove('showIconCheck');
  }
  elementIcon.childNodes[3].classList.add('showIconCheck');
}

function checkItemParticipant(elementIcon) {

  const itemSelected = document.querySelector('.liParticipant .showIconCheck')

  if(itemSelected !== null){
    itemSelected.classList.remove('showIconCheck');
  }
  elementIcon.childNodes[3].classList.add('showIconCheck');
}

//buscar messagens
function searchMessage() {
  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promisse.then(getMessages)
}

searchMessage();

function getMessages(response) {
  messages = response.data;

  renderMessages();
}


function renderMessages(){
  const ul = document.querySelector('.chatMessages');

  ul.innerHTML = '';

  for(let i = 0; i < messages.length; i++){

    ul.innerHTML = ul.innerHTML + `
        <li class="messageChat">
          <p> <span>${messages[i].time}</span> <strong>${messages[i].from}</strong> para <strong>${messages[i].to} </strong> ${messages[i].text}</p>
        </li>
    `;
}
}

renderMessages()
