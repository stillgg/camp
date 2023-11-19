// import { isDrag } from "./slider"

const popup = document.querySelector(".news__popup")
const sliderTrack = document.querySelector(".news-slider-track")

const newsContent = [
  {
    id: 1,
    date: "31.09.2022",
    title: "НОЯБРЬ – МЕСЯЦ ЯНДЕКС АЛИСЫ В PROMOTION.RU",
    text: [
      "Продолжаем прокачивать продукты Яндекса! В ноябре мы делаем упор на Я. Алису и активно реализуем установки на устройствах наших клиентов.",
      "А вы уже пользуетесь голосовым помощником от Яндекс?",
    ],
    imageTags: 'src="../resources/img/09-alice.jpg" srcset="../resources/img/09-alice.webp"',
  },
  {
    id: 2,
    date: "30.08.2022",
    title: "ОБЪЯВЛЯЕМ ОКТЯБРЬ МЕСЯЦЕМ ПРОКАЧКИ ЯНДЕКС ПЛЮС",
    text: [
      "Запускаем реализацию подписок Яндекс+ на наших точках с эксклюзивными условиями: два месяца кинопоиска и яндекс музыки бесплатно. Увлекательные фильмы и сериалы, разнообразные музыкальные рекомендации, а также кешбэк баллами для вас и 3 близких — это и есть Плюс Мульти. Баллы кешбэка за покупки, поездки и заказы. Получать баллы Плюса можно за поездки на такси с Go, покупки на Маркете, заказы в Еде и других сервисах Яндекса. А тратить — на новые поездки, покупки и развлечения.",
    ],
    imageTags: 'src="../resources/img/09-yandex-plus.png"',
  },
  {
    id: 3,
    date: "31.11.2021",
    title: "НОВОГОДНИЙ КОРПОРАТИВ С GAYAZOV$ BROTHER$ В НОВОСИБИРСКЕ",
    text: [
      "Мы в промоушен умеем не только хорошо работать, но и хорошо отдыхать, собирая на наши мероприятия коллег со всей России.",
      "Ребята из других городов оплатили свой перелёт и проживание промокоинами — внутренней бонусной валютой компании, которая начисляется за результативность.",
      "А кто будет хэдлайнером этого новогоднего корпоратива пока держим в секрете.",
      "Присоединяйся к нашей большой и дружной команде!",
    ],
    imageTags: 'src="../resources/img/09-conferention.png"',
  },
  {
    id: 4,
    date: "15.06.2022",
    title: "КОНФЕРЕНЦИЯ PROMOTION.RU В MOSCOW CITY",
    text: [
      "В ней принимали участие топовые сотрудники, имеющие хорошее качество продаж, HR и IT-отдел, руководство нашей компании и наших партнёров.",
      "Все они получили приглашение на мега-крутую тусовку, которая проходила с 14.07.2022 по 16.07.2022.",
      "Вечерняя программа на корабле по Москва-реке, ужин, дискотека и конечно же общение.",
      "И это всё - за наш счет.",
    ],
    imageTags: 'src="../resources/img/09-gayazov.png"',
  },
]

function renderNews(id) {
  const news = newsContent.find((element) => element.id === +id)

  document.querySelector(".news__popup").innerHTML = `
    <div class="news__top">
      <div class="close__wrapper">
        <div class="preview__close">
          <span class="close__strip"></span>
          <span class="close__strip"></span>
        </div>
      </div>

      <img class="top__image" ${news.imageTags} />
      <div class='top__wrapper'>
        <div class="top__date">${news.date}</div>
        <div class="top__title">${news.title}</div>
      </div>
    </div>

    <div class="news__bottom">
        <p class="bottom__text">
        Продолжаем прокачивать продукты Яндекса! В ноябре мы делаем упор на Я. Алису и активно реализуем установки
        на устройствах наших клиентов.
        </p>
        
        ${news.text.map((paragraph) => `<p class="bottom__text">${paragraph}</p>`).join("")}
    </div>`
}

sliderTrack.addEventListener("click", (e) => {
  const target = e.target.closest(".slider-item")

  if (target && !popup.classList.contains("active")) {
    renderNews(target.getAttribute("id"))
    closePopup()

    setTimeout(() => {
      popup.classList.add("active")
    }, 0)
  }
})

function closePopup() {
  const closePopup = popup.querySelector(".close__wrapper")

  const handleClick = (e) => {
    const isClickInsidePopup = popup.contains(e.target)

    if (!isClickInsidePopup && popup.classList.contains("active")) {
      popup.classList.remove("active")
      document.removeEventListener("click", handleClick)
    }
  }

  closePopup.addEventListener("click", () => {
    popup.classList.remove("active")
    document.removeEventListener("click", handleClick)
  })

  document.addEventListener("click", handleClick)
}
