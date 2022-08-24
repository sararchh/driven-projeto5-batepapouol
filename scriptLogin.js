let userFormatted;

// function fetchData(){
//   const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
// }


function redirectToHome(){
  window.location.href = './home/home.html';
}

function redirectError(){
  alert('Digite nome válido, pois este digitado já está em uso');
}


function logarChat(){
  const user = document.querySelector(".inputLogin").value;

  userFormatted = {
    name: user
  }
  
  const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userFormatted);

  promisse.then(redirectToHome);
  promisse.catch(redirectError);

  setTimeout(keepConnected, 5000);
}

function keepConnected(){
  
  const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userFormatted)
}



