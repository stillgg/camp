const content = document.querySelector(".meeting__content")
const preview = document.querySelector("img.content__preview")
const btnPlay = document.querySelector(".wrapper__play")
const video = document.querySelector(".content__video")
console.log(preview)

btnPlay.addEventListener("click", (e) => {
  preview.style.display = "none"
  btnPlay.style.display = "none"
  video.play()
})
