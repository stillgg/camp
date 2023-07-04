const marks = document.querySelectorAll(".mark");

marks.forEach((mark) => {
  mark.addEventListener("click", () => {
    deleteClasses();
    mark.parentNode.classList.add("animation-play");
  });
});

function deleteClasses() {
  marks.forEach((mark) => {
    mark.parentNode.classList.remove("animation-play");
  });
}
