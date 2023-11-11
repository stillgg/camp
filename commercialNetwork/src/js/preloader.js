const preloader = document.querySelector(".preloader")

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    preloader.classList.remove("active")
  }, 5000)
})
