const inputSelect = document.querySelector("Select")
const arrCities = [
  "Альметьевск",
  "Ангарск",
  "Астрахань",
  "Ачинск",
  "Балаково",
  "Барнаул",
  "Белорецк",
  "Бердск",
  "Бийск",
  "Братск",
  "Владивосток",
  "Волгоград",
  "Волжский",
  "Екатеринбург",
  "Ижевск",
  "Иркутск",
  "Казань",
  "Каменск-Уральский",
  "Кемерово",
  "Красноярск",
  "Ленинск-Кузнецкий",
  "Магнитогорск",
  "Набережные Челны",
  "Находка",
  "Нерюнгри",
  "Нижневартовск",
  "Нижнекамск",
  "Нижний Тагил",
  "Новокузнецк",
  "Новосибирск",
  "Норильск",
  "Омск",
  "Первоуральск",
  "Прокопьевск",
  "Ростов-на-Дону",
  "Саратов",
  "Стерлитамак",
  "Сургут",
  "Томск",
  "Тюмень",
  "Улан-Удэ",
  "Ульяновск",
  "Уфа",
  "Ханты-Мансийск",
  "Челябинск",
  "Энгельс",
  "Южно-Сахалинск",
  "Юрга",
  "Якутск",
  "Моего города нет в этом списке",
]

arrCities.forEach((city) => {
  fillCity(city)
})

function fillCity(name) {
  const elemCity = document.createElement("option")
  elemCity.value = name
  elemCity.textContent = name
  inputSelect.appendChild(elemCity)
}