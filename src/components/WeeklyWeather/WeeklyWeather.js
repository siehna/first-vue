import axios from 'axios'
import WeeklyWeatherCard from '@/components/WeeklyWeather/WeeklyWeatherCard/WeeklyWeatherCard'

export default {
  name: 'weekly-weather',
  components: {WeeklyWeatherCard},
  data() {
    return {
      cityWeather: [],

      prefectures: [],
      selectedPrefecture: [],
      cityList: [],

      requestUrl: []

    }
  },

  methods: {
    getLocation: function () {
      axios
        .get('http://weather.livedoor.com/forecast/rss/primary_area.xml', {responseType: 'document'})
        .then(responseXml => {
          let prefTags = responseXml['data'].getElementsByTagName('pref')
          let prefLength = prefTags.length
          let prefectures = []

          for (let i = 0; i < prefLength; i++) {
            let prefTag = prefTags[i]
            let prefecture = {
              areaName: prefTag.attributes['title'].textContent,
              cities: []
            }

            let citiesTags = prefTag.getElementsByTagName('city')
            let childrenLength = citiesTags.length

            for (let j = 0; j < childrenLength; j++) {
              let cityTag = citiesTags[j]
              let city = {
                //天気情報取得用のXMLソースのプロパティも必要
                cityName: cityTag.attributes['title'].textContent,
                id: cityTag.attributes['id'].textContent,
                src: cityTag.attributes['source'].textContent
              }
              prefecture.cities.push(city)
            }

            prefectures.push(prefecture)
          }

          this.prefectures = prefectures
        })
    },

    setCity: function () {
      console.log('selectedPrefecture')
      console.log(this.selectedPrefecture)
      let code = this.selectedPrefecture.cities[0].id
      this.requestUrl = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + code
    },

    getWeatherDescription: async function () {
      let self = this
      let cityWeather = await axios
        .get(this.requestUrl)
        .then(response => {
          return {
            description: response.data.description.text
          }
        })
        .catch(err => {
          console.error(err)
        })
      this.cityWeather = cityWeather
    },

    onSetArea: function () {
      this.setCity()
      this.getWeatherDescription()
    }
  },

  mounted: function () {
    eventHub.$emit('change-title', 'WeeklyWeather')
    this.getLocation()
  }
}
