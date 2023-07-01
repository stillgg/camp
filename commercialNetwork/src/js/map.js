const dots = document.querySelectorAll(".mark");
let timer = null;
console.log(dots);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    deleteClasses();
    dot.parentNode.classList.add("animation-play");
  });
});

function deleteClasses(activeIndex) {
  dots.forEach((dot, index) => {
    if (activeIndex !== index) {
      dot.parentNode.classList.remove("animation-play");
    }
  });
}
