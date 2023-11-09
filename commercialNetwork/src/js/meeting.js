const content = document.querySelector(".meeting__content")
const preview = document.querySelector("img.content__preview")
const mainBtnPlay = document.querySelector("#mainBtn")
const sideBtnPlay = document.querySelector("#sideBtnPlay")
const sideBtnPause = document.querySelector("#sideBtnPause")
const video = document.querySelector(".content__video")

video.controls = false

content.addEventListener("click", (e) => {
  preview.style.display = "none"
  mainBtnPlay.classList.toggle("pause")
  sideBtnPlay.classList.toggle("play")
  sideBtnPause.classList.toggle("pause")

  if (mainBtnPlay.classList.contains("pause")) video.play()
  else video.pause()
})
