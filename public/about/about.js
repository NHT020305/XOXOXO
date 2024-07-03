const viewMoreElement = document.querySelector(".details");
const moreElements = document.querySelectorAll(".rules");
let show = 0;

function reset() {
  viewMoreElement.textContent = "View more details";
  for (const moreElement of moreElements) {
    moreElement.style.display = "none";
  }
  show = 0;
}

function viewMore() {
  if (show == 0) {
    viewMoreElement.textContent = "Hide details";
    for (const moreElement of moreElements) {
      moreElement.style.display = "block";
    }
    show = 1;
  } else {
    reset()
  }
}

viewMoreElement.addEventListener("click", viewMore);
