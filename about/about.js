const viewMoreElement = document.querySelector(".details");
const motivationElement = document.getElementById("rules");
let show = 0;

function reset() {
  viewMoreElement.textContent = "View more details";
  motivationElement.style.display = "none";
  show = 0;
}

function viewMore() {
  if (show == 0) {
    viewMoreElement.textContent = "Hide details";
    motivationElement.style.display = "block";
    show = 1;
  } else {
    reset()
  }
}

viewMoreElement.addEventListener("click", viewMore);
