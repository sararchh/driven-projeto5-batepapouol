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
