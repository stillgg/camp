const videoWrapper = document.querySelector("#lazy-video")

function addVideo() {
  const isMobile = document.documentElement.clientWidth <= 768
  const isMobileExist = videoWrapper.firstElementChild.getAttribute("data-src")
  const isDesktopExist = videoWrapper.lastElementChild.getAttribute("data-src")

  if (isMobile && isMobileExist) {
    setVideo("first")
  } else if (isDesktopExist) {
    setVideo("last")
  }
}

function setVideo(position) {
  const video = position === "first" ? videoWrapper.firstElementChild : videoWrapper.lastElementChild
  const src = video.getAttribute("data-src")

  video.setAttribute("src", src)
  video.removeAttribute("data-src")

  video.setAttribute("autoplay", "autoplay")
  video.setAttribute("muted", "muted")
}

addVideo()

window.addEventListener("resize", addVideo)
