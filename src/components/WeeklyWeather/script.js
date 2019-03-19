import axios from 'axios'
import WeeklyWeatherCard from '@/components/WeeklyWeather/WeeklyWeatherCard/WeeklyWeatherCard'

export default {
  name: 'weekly-weather',
  components: {WeeklyWeatherCard},
  data() {
    return {
      weatherInfoList: [],
      weatherSummary: [],

      prefectures: [],
      selectedPrefecture: []

    }
  },

  methods: {
    getLocation: function () {
      axios
        .get('http://weather.livedoor.com/forecast/rss/primary_area.xml', {responseType: 'document'})
        .then(responseXml => {
          let prefTags = responseXml['data'].getElementsByTagName('pref')
          let prefLength = prefTags.length
          let prefecture = []

          for(let i=0; i<prefLength; i++){
            let prefTag = preftTags[i]
            let prefecture = {
              areaName
            }
          }
        })
    },

    onSetArea: function(){

    }
  },

  mounted: function () {
    eventHub.$emit('change-title', 'WeeklyWeather')
  }
}
