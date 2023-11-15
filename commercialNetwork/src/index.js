import "./scss/index.scss"
import "./js/preloader"
import "./js/hamburger"
import "./js/map"
import "./js/scrollBar"
import "./js/networkLoader"
import "./js/yandexMap"
import "./js/career/index"

import { slider } from "./js/slider"

slider("#slider-team-mobile")
slider("#slider-team-desktop", { effect: "cards" })

slider("#slider-news")
slider("#slider-merch")
