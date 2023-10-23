// const portainPopup = document.querySelector('.popup__portain-mode')

// window.addEventListener('resize', changeLandscape)

// function changeLandscape() {
//     const isMobile = /iPhone|iPad|iPod|Android|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
//     console.log(isMobile)

// screen.orientation.addEventListener('change',(e)=>{
//     portainPopup.classList.remove('active')
//     console.log(e.target.type)
//     if(e.target.type !== 'portrait-primary' && isMobile){
//         portainPopup.classList.add('active')
//     }

// })
// }

const portainPopup = document.querySelector(".popup__portain-mode")
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgentData.mobile)

window.addEventListener("resize", () => {
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgentData.mobile)
})

screen.orientation.addEventListener("change", (e) => {
  portainPopup.classList.remove("active")
  console.log(e.target.type !== "portrait-primary")
  console.log("isMobile", isMobile)
  if (e.target.type !== "portrait-primary" && isMobile) {
    portainPopup.classList.add("active")
  }
})
