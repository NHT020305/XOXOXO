const matchNameInput = document.getElementById("matchName");
const mainNicknameInput = document.getElementById("mainNickname");
const opponentNicknameInput = document.getElementById("opponentNickname");
const winnerInput = document.getElementById("winner");

const remainingChars = document.getElementById("remaining-chars");

const getInformationInput = document.querySelectorAll(".get-information input");

function updateRemainingChars(event) {
  const textEntered = event.target.value;
  const textLength = textEntered.length;
  const remainingChars = document.getElementById(
    "remaining-chars-" + event.target.name
  );

  remainingChars.textContent = event.target.maxLength - textLength;

  if (remainingChars.textContent < 10 && event.target.id === "matchName") {
    event.target.style.width = "53.5rem";
  } if (remainingChars.textContent >= 10 && event.target.id === "matchName") {
    event.target.style.width = "52.5rem";
  }
}

matchNameInput.addEventListener("input", updateRemainingChars);
mainNicknameInput.addEventListener("input", updateRemainingChars);
opponentNicknameInput.addEventListener("input", updateRemainingChars);
winnerInput.addEventListener("input", updateRemainingChars);
