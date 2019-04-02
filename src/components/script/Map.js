import axios from 'axios'

export default {
  data() {
    return {
      lat: '-',
      lng: '-',
      lngtext: '東経',
      map: ' ',
      temperature: '',
      high:'',
      low:'',
      weather: ''
    }
  },

  methods: {
    getMap: function () {
      let MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516)
      let Options = {
        zoom: 15,
        center: MyLatLng,
        mapTypeId: 'roadmap'
      }
      this.map = new google.maps.Map(document.getElementById('map'), Options)
      this.lat = this.map.getCenter().lat()
      this.lng = this.map.getCenter().lng()
      console.log(this.map.getCenter())
    },
    getLatLng: function () {
      // 緯度格納
      let getCenter = this.map.getCenter()
      this.lat = getCenter.lat()

      // 東経西経判断 0~180
      let longitude = getCenter.lng()
      let longitudeABS = Math.abs(longitude)
      let lngFlag = Math.abs(Math.floor(longitude / 180)) % 2
      lngFlag ? this.lngtext = '西経' : this.lngtext = '東経'

      // 経度格納
      if (longitude >= 0) {
        if (lngFlag) {
          this.lng = Math.abs(180 - longitudeABS % 180)
        } else {
          this.lng = Math.abs(longitudeABS % 180)
        }
      } else {
        if (lngFlag) {
          this.lng = Math.abs(longitudeABS % 180)
        } else {
          this.lng = Math.abs(180 - longitudeABS % 180)
        }
      }
    },
    getWeatherData: function () {
      let longitude = ''
      this.lngtext === '東経' ? longitude = this.lng : longitude = -this.lng
      let requestUrl = 'https://api.darksky.net/forecast/e0fcfd0180d7ed7a1950e4baa054e3b1/'
        + this.lat + ',' + longitude + '?units=si&lang=ja'

      axios
        .get(requestUrl)
        .then(res => {
          console.log('res')
          console.log(res)
          let weatherData = res.data.daily
          this.weather=weatherData['summary']
          this.low=weatherData.data[0].temperatureLow
          this.high=weatherData.data[0].temperatureHigh
          console.log(weatherData)
        })

    },

    //イベントハンドラ
    onDragEndMap: function () {
      this.getLatLng()
      this.getWeatherData()
    }
  },

  mounted: function () {
    eventHub.$emit('change-title', 'Map')
    this.getMap()
  }
}
