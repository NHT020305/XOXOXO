function openChooseName(event) {
  wonPlayer = 0;
  editedPlayer = +event.target.dataset.playerid;
  aside.style.display = "inline-block";
  backdrop.style.display = "block";
}


function closeChooseName() {
  aside.style.display = "none";
  backdrop.style.display = "none";
  validText.style.display = "none";
  label.style.color = "black";
  input.style.backgroundColor = "white";
  input.value = "";
}


function isValid(name) {
  if (name.length > 8 || !name) {
    return false;
  }
  return true
}


function saveConfiguration(event) {

  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("player-name").trim();

  if (!isValid(enteredPlayerName)) {
    validText.style.display = "block";
    label.style.color = "brown";
    input.style.backgroundColor = "pink";
    return;
  }

  const updatedPlayer = document.getElementById("player-" + editedPlayer);
  updatedPlayer.children[0].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;

  closeChooseName();
}
