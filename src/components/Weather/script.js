import axios from 'axios'

export default {
  name: 'weather-component',
  data() {
    return {
      //表示情報
      weatherInfo: {
        dateLabel: [],
        telop: [],
        date: [],
        temperature: {
          max: [],
          min: []
        },
        weatherSummary: '',
        iconUrl: [],
      },

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
      console.log('#### setCityId')
      //.attribute はxml用 　連想配列は次のようにドットを打つだけ
      let code = this.selectedCity.id
      this.requestUrl = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + code
    },


    //天気情報の取得
    getWeatherData: function () {
      // リストIdから情報の取得

      //　thisが使えないので変数に入れて使う ついでにweather付けとくとコード量減
      let self = this.weatherInfo

      //APIの読み込み
      axios
        .get(this.requestUrl)
        .then(response => {
          let forecasts = response.data.forecasts

          for (let i = 0; i < forecasts.length; i++) {
            // 情報の取得
            if (forecasts[i].dateLabel === null) {
            } else {
              self.dateLabel[i] = forecasts[i].dateLabel
            }
            if (forecasts[i].telop === null) {
              self.telop[i] = '-'
            } else {
              self.telop[i] = forecasts[i].telop
            }
            if (forecasts[i].image.url === null) {
            } else {
              self.iconUrl[i] = forecasts[i].image.url
            }
            if (forecasts[i].date === null) {
              self.date[i] = '-'
            } else {
              self.date[i] = forecasts[i].date
            }

            ////////////////////////////////////////////////////////////
            //最高・最低気温の取得
            if (forecasts[i].temperature.min === null) {
              self.temperature.min[i] = '-'
            } else {
              self.temperature.min[i] = forecasts[i].temperature.min.celsius
            }
            if (forecasts[i].temperature.max === null) {
              self.temperature.max[i] = '-'
            } else {
              self.temperature.max[i] = forecasts[i].temperature.max.celsius
            }
            //お天気アイコンの取得
            if (forecasts[i].image.url === null) {
            } else {
              self.iconUrl[i] = forecasts[i].image.url
            }
          }
          //for 文ここまで

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
