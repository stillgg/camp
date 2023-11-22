const preloader = document.querySelector(".preloader")
const animationDelay = 3000
const start = sessionStorage.getItem("startTime") || 0

document.addEventListener("DOMContentLoaded", () => {
  const modules = [
    import("./scss/index.scss"),
    import("./js/hamburger"),
    import("./js/map"),
    import("./js/scrollBar"),
    import("./js/networkLoader"),
    import("./js/yandexMap"),
    import("./js/career/index"),
    import("./js/slider").then((module) => {
      const slider = module.slider
      slider("#slider-team-mobile")
      slider("#slider-team-desktop", { effect: "cards" })

      slider("#slider-news")
      slider("#slider-merch")
    }),
  ]

  Promise.all(modules).then(() => {
    const end = Date.now()
    const timeout = animationDelay - (end - start)

    const timer = setTimeout(() => {
      preloader.classList.remove("active")
      clearTimeout(timer)
    }, timeout)
  })
})
