const preloader = document.querySelector(".preloader")
const animationDelay = 3000
const start = sessionStorage.getItem("startTime") || 0

document.addEventListener("DOMContentLoaded", () => {
  const modules = [import("./scss/index.scss"), import("./js/main")]

  Promise.all(modules).then(() => {
    const end = Date.now()
    const timeout = animationDelay - (end - start)

    const timer = setTimeout(() => {
      preloader.classList.remove("active")
      clearTimeout(timer)
    }, timeout)
  })
})
