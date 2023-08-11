import "./scss/index.scss"
import "./js/hamburger"
import "./js/map"
import "./js/teamSlider"
import "./js/scrollBar"

import { slider } from "./js/slider"

// const sliderTeam = slider("#slider-team")

let sliderNews = slider("#slider-news")
// const sliderMerch = slider("#slider-merch")

function debounce(callback, delay) {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
}

window.addEventListener("resize", () => {
  // sliderTeam.destroy()
  const currentIndex = sliderNews.getCurrentIndex()
  const { selector, params } = sliderNews.destroy()
  debounce((sliderNews = slider(selector, params)), 2000)

  sliderNews.setCurrentIndex(currentIndex)
  // console.log("resize", { selector, params })
  // // sliderMerch.destroy()

  // sliderTeam.init()

  // sliderMerch.init()
})
