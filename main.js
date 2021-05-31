let loc = document.getElementById("location");
let temp_icon = document.getElementById("temp_icon");
let temp_value = document.getElementById("temp_value");
let climate = document.getElementById("climate");
let windy = document.getElementById("wind_speed");

const search_input = document.getElementById("search_input");
const search_button = document.getElementById("search_button");

search_button.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(search_input.value);
    search_input.value = '';
});

const getWeather=async (city) =>
{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
                            &appid=e48aad263d1e41dc8ce10cefc49a1f73`, {mode:'cors'}
        );

        const weatherData = await response.json();
        //console.log(weatherData); //prints json format of API in console.
        const{name} = weatherData;
        const{feels_like} = weatherData.main;
        const{id,main} = weatherData.weather[0];
        var s = weatherData.wind.speed * (18/5);

        windy.textContent = s.toFixed(2);
        loc.textContent = name;
        climate.textContent = main;
        temp_value.textContent = Math.round(feels_like-273);

        // console.log(id);
        if (id > 800)           temp_icon.src = "icons/clouds-and-sun.png";  
        else if (id == 800)     temp_icon.src = "icons/sun.png";             
        else if (id >= 700)     temp_icon.src = "icons/cloud.png";           
        else if (id >= 600 )    temp_icon.src = "icons/snow.png";            
        else if (id >= 500 )    temp_icon.src = "icons/rain.png";            
        else if (id >= 300 )    temp_icon.src = "icons/drizzle.png";         
        else if (id >= 200)     temp_icon.src = "icons/thunderstorm.png";    
    }
    catch(error)
    {
        alert("City not found!");
    }
};

window.addEventListener("load", ()=>{
    let long;
    let lat;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}
                            &appid=e48aad263d1e41dc8ce10cefc49a1f73`
            
            fetch(api).then((response)=>{
                return response.json();
            })
            .then(data=>{
                const{name} = data;
                const{feels_like} = data.main;
                const{id,main} = data.weather[0];

                loc.textContent = name;
                climate.textContent = main;
                temp_value.textContent = Math.round(feels_like-273);

                // console.log(id);
                if (id > 800)           temp_icon.src = "icons/clouds-and-sun.png";  
                else if (id == 800)     temp_icon.src = "icons/sun.png";             
                else if (id >= 700)     temp_icon.src = "icons/cloud.png";           
                else if (id >= 600 )    temp_icon.src = "icons/snow.png";            
                else if (id >= 500 )    temp_icon.src = "icons/rain.png";            
                else if (id >= 300 )    temp_icon.src = "icons/drizzle.png";         
                else if (id >= 200)     temp_icon.src = "icons/thunderstorm.png";    
               // console.log(data);
            })
        })
    }
})