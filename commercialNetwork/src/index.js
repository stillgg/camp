import "./scss/index.scss"
import "./js/hamburger"
import "./js/map"
import "./js/teamSlider"
import "./js/scrollBar"

import { slider } from "./js/slider"

// const sliderTeam = slider("#slider-team")

const sliderNews = slider("#slider-news")

// const sliderMerch = slider("#slider-merch")

window.addEventListener("resize", () => {
  // sliderTeam.destroy()
  sliderNews.destroy()
  // sliderMerch.destroy()

  // sliderTeam.init()
  sliderNews.init()
  // sliderMerch.init()
})
