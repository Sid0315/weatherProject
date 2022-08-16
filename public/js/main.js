const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");

const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");

const temp_real_val = document.getElementById("temp_real_val");

const day = document.getElementById("day");
const time = document.getElementById("time");
const today_date = document.getElementById("today_date");

const dataHide = document.querySelector(".middle_layer");

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value; 
    if( cityVal === "") {
        city_name.innerText =  `plz write the name before search`;
        dataHide.classList.add("data_hide");
    }
    else {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=57666a5e53a1e4f204b2d2c49d2e1284`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp_real_val .innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            // condition to check temp_status
            if (tempMood == "Clear") {
                temp_status.innerHTML =`<i class="fas fa-sun" style='color : #d8ad12'></i>`;
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =`<i class="fas fa-cloud" style='color : #6e6d67'></i>`;
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =`<i class="fas fa-cloud-rain" style='color : #6e6d67'></i>`;
            } else {
                temp_status.innerHTML =`<i class="fas fa-cloud-sun" style='color : #6e6d67'></i>`;
            }

            dataHide.classList.remove("data_hide");

        } catch {
            city_name.innerText =  `plz enter the city name properly`;
            dataHide.classList.add("data_hide");
        }
    }
}

const getDay = () => {
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const curentDay = new Date();
    let day = weekday[curentDay.getDay()];
    return day;   
};

day.innerHTML = getDay();

const getTime = () => {
    const curentTime = new Date();
    let hours = curentTime.getHours();
    
    let min = curentTime.getMinutes();
    if (min < 10) {
        min = "0"+min;
    }
    let periods = "AM";
            if(hours > 11){
                periods = "PM";
                if(hours > 12) hours -= 12;
            }

    return `${hours} ${min} ${periods}` ;
}

const getMonth = () => {
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const curentMonth = new Date();
    let monthName = month[curentMonth.getMonth()];
    let date = curentMonth.getDate();
    if(date < 10 ) {
        date = "0" + date ;
    }
    
    return `${monthName} ${date}`;
}

day.innerHTML = getDay();
time.innerHTML = getTime();
today_date.innerHTML = getMonth();

submitBtn.addEventListener('click', getInfo);