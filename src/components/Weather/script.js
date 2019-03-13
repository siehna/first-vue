import axios from 'axios';

export default {
  name: 'weather-component',
  data() {
    return {
      //表示情報
      dialog: '',
      dateLabel: ['…', '…', '…'],
      telop: ['no data', 'no data', 'no data'],
      date: ['no date', 'no date', 'no date'],
      max: ['-', '-', '-'],
      min: ['-', '-', '-'],
      text: 'no text',
      iconUrl: [],

      //把持情報
      prefectures: [],
      selectedPrefecture: {},
      selectedCity: null,

      //選択エリア・都市名
      area: '',
      city: '',

      //リクエスト用URL
      requestUrl: "",

      //XML情報
      areaName: '',
      cityName: '',
      cityId: '',
    }
  },


  methods: {
    //XMLからリスト情報の取得
    getLocation: function () {
      axios
        .get('http://weather.livedoor.com/forecast/rss/primary_area.xml', {responseType: 'document'})
        .then(responseXml => {
          let prefTags = responseXml['data'].getElementsByTagName('pref')
          //広域エリアリストにプッシュ（連想配列）
          let prefLength = prefTags.length
          let prefectures = []

          for (let i = 0; i < prefLength; i++) {
            let prefTag = prefTags[i]
            // this.$set(this.dropdownWide, i, prefTags[i].attributes['title'].textContent)
            // this.dropdownWide.push({
            //   text: prefTag.attributes['title'].textContent,
            //   callback: () => console.log(prefTag.attributes['title'].textContent)
            // })

            let prefecture = {
              title: prefTag.attributes['title'].textContent,
              cities: []
            }

            //小規模エリアリストにプッシュ（連想配列）
            let citiesTags = prefTag.getElementsByTagName('city')
            let childrenLength = citiesTags.length
            for (let j = 0; j < childrenLength; j++) {
              let cityTag = citiesTags[j]
              let city = {
                text: cityTag.attributes['title'].textContent,
                id: cityTag.attributes['id'].textContent
              }
              prefecture.cities.push(city)
            }
            prefectures.push(prefecture)
          }
          this.prefectures = prefectures

          //表示用配列にデータを渡す(広域で選択していないときは全件表示)
          // this.dropdownCloseSelected = this.dropdownClose
          // console.log('dropdownCloseSelected')
          // console.log(this.dropdownCloseSelected)
        })
    },

    //都市コードのセット
    setCityId: function () {
      console.log('#### setCityId')
      //.attribute はxml用 　連想配列は次のようにドットを打つだけ
      // let code = this.dropdownCloseSelected.filter(dropdownCloseSelected => dropdownCloseSelected.text === this.city)[0].id
      let code = this.selectedCity.id
      this.requestUrl = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + code
      console.log("requestURL")
      console.log(this.requestUrl)
    },

    //天気情報の取得
    getWeatherData: function () {
      console.log('#### getWeatherData')
      // リストIdから情報の取得
      //　thisが使えないので変数に入れて使う
      let self = this
      //APIの読み込み
      axios
        .get(this.requestUrl)
        .then(response => {
          let forecasts = response.data.forecasts
          console.log('forecasts')
          console.log(forecasts)
          for (let i = 0; i < forecasts.length; i++) {
            self.dateLabel[i] = forecasts[i].dateLabel
            self.telop[i] = forecasts[i].telop

            this.iconUrl[i] = response['data']['forecasts'][i]["image"]["url"]
            self.date[i] = forecasts[i].date
            //最高・最低気温の取得
            if (forecasts[i].temperature.min === null || forecasts[i].temperature.max === null) {
            } else {
              self.min[i] = forecasts[i].temperature.min.celsius
              self.max[i] = forecasts[i].temperature.max.celsius
            }
            if (forecasts[i].image.url === null) {
            } else {
              self.iconUrl[i] = forecasts[i].image.url
              console.log('iconURL ' + i)
              console.log(self.iconUrl[i])
            }
          }
          self.text = response.data.description.text
        })
        .catch(err => {
          console.log('FFFFFF fail')
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
