import axios from 'axios'
import WeatherCard from '@/components/Weather/WeatherCard/WeatherCard'

export default {
  name: 'weather-component',
  components: {WeatherCard},
  data() {
    return {
      //表示情報
      weatherInfo: [],
      //表示情報その2
      weatherSummary: 'no text',

      //各種v-モデル用のitem
      prefectures: [],
      selectedPrefecture: {},
      selectedCity: null,

      //リクエスト用URL
      requestUrl: '',
      //詳細ページ用
      dialog: ''
    }
  },


  methods: {
    //XMLからリスト情報の取得
    getLocation: function () {
      axios
        .get('http://weather.livedoor.com/forecast/rss/primary_area.xml', {responseType: 'document'})
        .then(responseXml => {
          let prefTags = responseXml['data'].getElementsByTagName('pref')
          //XMLはデータ処理をしないといけないのだ・・・
          //地域リスト作成
          let prefLength = prefTags.length
          let prefectures = []

          for (let i = 0; i < prefLength; i++) {
            let prefTag = prefTags[i]
            let prefecture = {
              areaName: prefTag.attributes['title'].textContent,
              cities: []
            }

            //city[]の情報も入れる
            let citiesTags = prefTag.getElementsByTagName('city')
            let childrenLength = citiesTags.length

            for (let j = 0; j < childrenLength; j++) {
              let cityTag = citiesTags[j]
              let city = {
                cityName: cityTag.attributes['title'].textContent,
                id: cityTag.attributes['id'].textContent
              }
              prefecture.cities.push(city)
            }

            prefectures.push(prefecture)
          }

          this.prefectures = prefectures
        })
    },


    //都市コードのセット
    setCityId: function () {
      //.attribute はxml用 　連想配列は次のようにドットを打つだけ
      let code = this.selectedCity.id
      this.requestUrl = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + code
    },


    //天気情報の取得
    getWeatherData: function () {
      // カードの情報をつっこむ
      //　thisが使えないので変数に入れて使う ついでにweather付けとくとコード量減 ?
      let self = this

      //APIの読み込み
      axios
        .get(this.requestUrl)
        .then(response => {
          self.weatherInfo = response.data.forecasts
          for (let i = 0; i < self.weatherInfo.length; i++) {
            let temperature = self.weatherInfo[i].temperature
            if (temperature.min === null) {
              // temperature.min.push({celsius:'-'})
              temperature.min = {
                celsius: '-'
              }
            }
            if (temperature.max === null) {
              // temperature.max.celsius = '-'
              temperature.max = {
                celsius: '-'
              }
            }
          }
          self.weatherSummary = response.data.description.text
        })
        .catch(err => {
          console.error(err)
        })
    },

    // イベントハンドラ
    onSetCloseArea: function () {
      //都市選択時のイベント
      //cityIdの設定
      this.setCityId()
      //axiosでの天気情報取得
      this.getWeatherData()
    }
  },


  mounted: function () {
    //ヘッダーへページ名のエミット
    eventHub.$emit('change-title', 'Weather')
    //リスト情報の取得
    this.getLocation()
  }
}
