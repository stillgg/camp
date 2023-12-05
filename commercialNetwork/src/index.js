const preloader = document.querySelector(".preloader")
const preloaderLine = document.querySelector(".preloader__line")
const animationDelay = 3000
const start = sessionStorage.getItem("startTime") || 0

document.addEventListener("DOMContentLoaded", () => {
  const modules = [import("./scss/index.scss"), import("./js/main")]

  Promise.all(modules).then(() => {
    const end = Date.now()
    const timeout = animationDelay - (end - start)

    const timer = setTimeout(() => {
      preloaderLine.style.width = 100 + "%"

      const timerAnimation = setTimeout(() => {
        preloader.classList.remove("active")
        clearTimeout(timerAnimation)
      }, 300)

      clearTimeout(timer)
    }, timeout)
  })
})
