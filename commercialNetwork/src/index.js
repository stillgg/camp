import "./scss/index.scss"
import "./js/hamburger"
import "./js/map"
import "./js/teamSlider"
import "./js/scrollBar"

import { slider } from "./js/slider"

slider("#slider-team-mobile")
slider("#slider-team-desktop", { effect: "desktop" })

slider("#slider-news")
slider("#slider-merch")
