// API key - feb82071f427f99e2d2e4cc94e8df607

// Кнопка для поиска и добавления города
let applyButton = document.querySelector(".apply-city");

// Переменная для создания url, которая будет загружена в fetch
let url = "";

// Кнопка открытия модального окна с поиском города
let button = document.querySelector(".show-modal");
let modal = document.querySelector(".setting-window");

button.addEventListener("click", () => {
    modal.style.left = "0px"
})

// Добавляем событие на клик кнопки поиска
applyButton.addEventListener("click", () => {
    // Считываем значение с input
    let inputCity = document.querySelector(".input-city").value;

    // Скрываем модальное окно
    modal.style.left = "-370px"

    // Полученное значение редактируем для поиска
    inputCity = inputCity.split("");
    inputCity[0] = inputCity[0].toUpperCase();
    inputCity = inputCity.join("");
    // console.log(inputCity);

    // Вызываем функцию для создания url, и передаем готовое значение
    url = createUrl(inputCity);

    // Вызываем основную функцию
    getWeather();
})

// Функция для создания url
function createUrl(input) {
    let part1 = "https://api.openweathermap.org/data/2.5/weather?q=";
    let part2 = "&appid=feb82071f427f99e2d2e4cc94e8df607";
    let city = input;
    // console.log(part1 + city + part2);

    // Склеиваем значения и возвращаем как строку
    return part1 + city + part2;
}

// Функция для получения текущего дня в виде названия дня недели, возвращаем название
function currentDay() {
    let nameDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = new Date().getDay();

    return nameDays[day];
}

// Функция для приветствия пользователя в зависимости от времени суток
function getGreet() {
    let greeting = new Date().getHours();
    // console.log(greeting);

    if (greeting >= 5 && greeting <= 12) {
        return "Good morning";
    } else if (greeting >= 0 && greeting < 5) {
        return "Good night";
    } else if (greeting > 12 && greeting < 18) {
        return "Good afternoon";
    } else if (greeting >= 18 && greeting <= 24) {
        return "Good evening";
    }
}

function getWeather() {
    // Передаем готовый url
    fetch(url)
        // Возвращаем json
        .then(function (resp) {
            return resp.json();
        })
        // Работаем с данными
        .then(function (data) {
            console.log(data);
            
            // Название города
            document.querySelector(".city").textContent = data.name;

            // Температура, переводим из кельвинов в цельсии
            document.querySelector(".weather-degrees").innerHTML = Math.round(data.main.temp - 273) + "&deg;";

            // Что за погода
            document.querySelector(".weather-description").textContent = data.weather[0]["description"];

            // Дефолтная картинка от openweathermap
            // document.querySelector(".weather-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@4x.png" width="230">`;

            // Добавление собственной картинки
            document.querySelector(".weather-icon").innerHTML = `<img src="img/${data.weather[0]["icon"]}.svg">`;

            // Ощущается как, переводим из кельвинов в цельсии
            document.querySelector(".weather-feel").innerHTML = "Feel like " + Math.round(data.main["feels_like"] - 273) + "&deg;";

            // Получаем название дня недели
            document.querySelector(".day-week").innerHTML = currentDay();

            // Получаем приветствие в зависимости от времени суток
            document.querySelector(".day-greeting").innerHTML = getGreet();
        })
        .catch(function () {
            console.error("err");
        });
}