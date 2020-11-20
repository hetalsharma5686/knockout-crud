import WeatherService from './../../services/WeatherService';

const data = [
    {
        city: "Mumbai",
        country: "IN"     
    },
    {
        city: "Ahmedabad",
        country: "IN"
    },
    {
        city: "Orlando",
        country: "US"
    },
    {
        city: "Brooklyn",
        country: "US"
    },
    {
        city: "Barcelona",
        country: "ES"
    },
    {
        city: "Toronto",
        country: "CA"
    }
];

class WeatherReportViewModel {
    constructor (context) {
        this.selectedCountry = ko.observable(null);
        this.selectedCity = ko.observable(null);
        this.temperature = ko.observable(-1);
        
        this.countries = ko.pureComputed(() => {
            return ko.utils.arrayGetDistinctValues(ko.utils.arrayMap(data, (value) => value.country));
        });

        this.cities = ko.pureComputed(() => {
            const cityArr = ko.utils.arrayFilter(data, (value) => value.country === this.selectedCountry());
            return ko.utils.arrayMap(cityArr, (value) => value.city);
        });

        this.selectedCity.subscribe(async (selectedCity) => {
            if (selectedCity) {
                const ctx = ko.contextFor(document.querySelector('app-component'));
                ctx.$root.isLoading(true);
                const weather = await WeatherService.getWeatherByCity(selectedCity);
                ctx.$root.isLoading(false);
                this.temperature(weather.main.temp);
            }
        });
    }
}

export default WeatherReportViewModel;