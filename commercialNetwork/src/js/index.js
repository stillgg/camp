
const portainPopup = document.querySelector('.popup__portain-mode')
const mobileWidth = 768

screen.orientation.addEventListener('change',(e)=>{
    portainPopup.classList.remove('active')

    if(e.target.type !== 'portrait-primary'){
        portainPopup.classList.add('active')
    }

})