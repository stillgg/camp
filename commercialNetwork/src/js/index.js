
const portainPopup = document.querySelector('.popup__portain-mode')

screen.orientation.addEventListener('change',(e)=>{
    portainPopup.classList.remove('active')

    if(e.target.type !== 'portrait-primary'){
        portainPopup.classList.add('active')
    }

})