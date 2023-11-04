const container = document.querySelector(".meeting__content")
const content = document.querySelector(".meeting__content")

const atr = {
  width: "100%",
  height: "100%",
  src: "https://www.youtube.com/embed/U32IX-HLmms?autoplay=1",
  title: "YouTube video player",
  frameborder: "0",
  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
  allowfullscreen: "allowfullscreen",
}

function setAttributes(iframe) {
  for (const group of Object.entries(atr)) {
    const [key, value] = group
    iframe.setAttribute(key, value)
  }
}

function removeContainerChilds() {
  const content = container.children

  Array.from(content).forEach((element) => {
    element.remove()
  })
}

function createIframe() {
  const iframe = document.createElement("iframe")

  setAttributes(iframe)

  container.appendChild(iframe)
}

content.addEventListener("click", () => {
  content.style.height = "100%"
  removeContainerChilds()
  createIframe()
})
