class WeatherService {
    static getWeatherByCity = (cityName) => {
        return new Promise((resolve, reject) => {
            $.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=046ed8bff7495b412401ead48df24cde`)
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }
}

export default WeatherService;