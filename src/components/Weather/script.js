import axios from 'axios';

export default {
  name: 'weather-component',
  data() {
    return {
      //表示情報
      info: '',
      dateLabel: ['empty', 'empty', 'empty'],
      telop: ['no data', 'no data', 'no data'],
      date: ['no data', 'no data', 'no data'],
      max: ['-', '-', '-'],
      min: ['-', '-', '-'],
      text: 'no text',
      iconUrl: null,

      //把持情報
      prefectures: [],
      selectedPrefecture: {},
      selectedCity: null,

      //検証用データ
      bottomNav: '',

      //選択エリア・都市名
      area: '',
      city: '',

      //リクエスト用URL
      requestUrl: "",

      //XML情報
      areaName: '',
      cityName: '',
      cityId: '',

      //把持情報
      dropdownWide: [],
      dropdownClose: [],
      dropdownCloseSelected: [],
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
              cities: [],
              callback: () => console.log(prefTag.attributes['title'].textContent)
            }

            //小規模エリアリストにプッシュ（連想配列）
            let citiesTags = prefTag.getElementsByTagName('city')
            let childrenLength = citiesTags.length
            for (let j = 0; j < childrenLength; j++) {
              let cityTag = citiesTags[j]
              let city = {
                text: cityTag.attributes['title'].textContent,
                id: cityTag.attributes['id'].textContent,
                callback: () => console.log(city.attributes['title'].textContent)
              }
              prefecture.cities.push(city)
            }

            prefectures.push(prefecture)
          }

          console.log(prefectures)
          this.prefectures = prefectures
          //表示用配列にデータを渡す(広域で選択していないときは全件表示)
          this.dropdownCloseSelected = this.dropdownClose
          console.log('dropdownCloseSelected')
          console.log(this.dropdownCloseSelected)
        })
    },


    //エリア情報から都市の絞り込み
    filterCity: function () {
      // area と同じ text (都市名)のものを selected に入れる
      //表示配列の初期化
      this.dropdownCloseSelected = []
      //引数のエリア名に一致する要素をフィルターして代入
      this.dropdownCloseSelected = this.dropdownClose.filter(dropdownClose => dropdownClose.area === this.area)

      console.log('filterCity')
      console.log(this.dropdownCloseSelected)
    },


    //都市コードのセット
    setCityId: function () {
      console.log("position check")
      //.attribute はxml用 　連想配列は次のようにドットを打つだけ
      let code = this.dropdownCloseSelected.filter(dropdownCloseSelected => dropdownCloseSelected.text === this.city)[0].id
      this.requestUrl = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + code
      console.log("requestURL")
      console.log(this.requestUrl)
    },

    //天気情報の取得
    getWeatherData: function () {
      let url = this.requestUrl
      // リストIdから情報の取得
      //APIの読み込み
      axios
        .get(url)
        .then(response => {
          for (let i = 0; i < response['data']['forecasts'].length; i++) {
            this.dateLabel[i] = response['data']['forecasts'][i]["dateLabel"]
            this.telop[i] = response['data']['forecasts'][i]["telop"]
            // this.iconUrl[i] = response['data']['forecasts'][i]["image"]["url"]
            this.date[i] = response['data']['forecasts'][i]["date"]
            this.min[i] = response['data']['forecasts'][i]["temperature"]["min"]["celsius"]
            this.max[i] = response['data']['forecasts'][i]["temperature"]["max"]["celsius"]
            // this.info=response['data']['forecasts'][this.num]
            // console.log(response['data'])
          }
          this.text = response['data']['description']['text']
        })
        .catch(err => {
          this.info = 'fault to get API'
        })
    },


    // イベントハンドラ
    onSetWideArea: function (areaName) {
      //広域エリア選択時のイベント
      //表示用配列のフィルタ
      this.filterCity(areaName)
    },

    onSetCloseArea: function () {
      //都市選択時のイベント
      //cityIdの設定
      this.setCityId()
      //axiosでの天気情報取得
      this.getWeatherData()
      //表示用に天気情報を入れる?
      console.log('dateLabel')
      console.log(this.dateLabel)
      console.log('max')
      console.log(this.max)
      console.log('min')
      console.log(this.min)
    }

  },


  mounted: function () {
    //ヘッダーへページ名のエミット
    eventHub.$emit('change-title', 'Weather');

    //リスト情報の取得
    this.getLocation();
  }
}
