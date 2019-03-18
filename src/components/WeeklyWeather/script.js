
import WeeklyWeatherCard from '@/components/WeeklyWeather/WeeklyWeatherCard/WeeklyWeatherCard'

export default{
  name :'weekly-weather',
  components:{WeeklyWeatherCard},
  data(){
    return{

    }
  },

  mounted: function(){
    eventHub.$emit('change-title','WeeklyWeather')
  }
}
