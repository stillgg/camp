const container = document.querySelector(".meeting__content")
const content = document.querySelector(".meeting__content")

function removeContainerChilds() {
  const content = container.children

  Array.from(content).forEach((element) => {
    element.remove()
  })
}

function createIframe() {
  container.innerHTML = `
  <iframe  width= "100%" height= "100%" src= "https://www.youtube.com/embed/U32IX-HLmms?autoplay=1" title="YouTube video player"
   frameborder= "0" allow= "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   allowfullscreen= "allowfullscreen">
  </iframe>
  `
}

content.addEventListener("click", () => {
  content.style.height = "100%"
  removeContainerChilds()
  createIframe()
})
