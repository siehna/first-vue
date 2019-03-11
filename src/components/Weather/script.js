import axios from 'axios';
export default{
  name:'weather-component',
  data(){
    return{
      info:'',
      dateLabel:'empty',
      telop:'no data',
      date:'no data',
      text:'no text',
      max:'',
      min:'',
      iconUrl:null,
      cityCode:130010,
      bottomNav: '',
      area:"",
      areaName:'',
      cityName:'',
      cityId:'',


      dropdownWide: [],
      dropdownClose: [],
      dropdown_close_selected:[],


      num: 1
    }
  },




  methods:{
    // クリックするとAPI取得ができるメソッド
    //天気情報の取得
    getWeatherData: function () {
      let url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + this.cityCode//Idにすると404が出る、要質問
      // リストIdから情報の取得
      //APIの読み込み
      axios
        .get(url)
        .then(response => {
          for(var num=0; num<response['data']['forecasts'].length; num++) {
            this.dateLabel = response['data']['forecasts'][this.num]["dateLabel"]
            this.telop = response['data']['forecasts'][this.num]["telop"]
            // this.iconUrl = response['data']['forecasts'][this.num]["image"]["url"]
            // this.date = response['data']['forecasts'][this.num]["date"]
            this.min=response['data']['forecasts'][num]["temperature"]["min"]["celsius"]
            this.max=response['data']['forecasts'][num]["temperature"]["max"]["celsius"]
            this.text = response['data']['description']['text']
            // this.info=response['data']['forecasts'][this.num]
            console.log(response['data'])
          }
        })
        .catch(err => {
          this.info = 'fault to get API'
        })
    },



    //XMLからリスト情報の取得
    getLocation: function(){
      axios
        .get('http://weather.livedoor.com/forecast/rss/primary_area.xml',{responseType:'document'})
        .then(responseXml =>{
          //広域エリアリストにプッシュ（連想配列）
          let prefLength = responseXml['data'].getElementsByTagName('pref').length
          for(let i=0; i<prefLength; i++){
            // this.$set(this.dropdownWide, i, responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent)
            this.dropdownWide.push({
              text:responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent,
              callback:()=> console.log(responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent)
            })

            //小規模エリアリストにプッシュ（連想配列）
            let childrenLength=responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city').length
            for(let j=0; j<childrenLength; j++){
              this.dropdownClose.push({
                area:responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent,
                text: responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city')[j].attributes['title'].textContent,
                id: responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city')[j].attributes['id'].textContent,
                callback: () => console.log(responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city')[j].attributes['title'].textContent)
              })
            }
          }
          //表示用配列にデータを渡す(広域で選択していないときは全件表示)
          this.dropdownCloseSelected = this.dropdownClose
          console.log('dropdownCloseSelected')
          console.log(this.dropdownCloseSelected)
        })
    },
    
    
    
    filterCity: function (areaName=this.area) {
      // area と同じ text (都市名)のものを selected に入れる
      //表示配列の初期化
      this.dropdownCloseSelected = []
      //引数のエリア名に一致する要素をフィルターして代入
      this.dropdownCloseSelected = this.dropdownClose.filter(dropdownClose => dropdownClose.area === areaName)

      // console.log('filterCity')
      // console.log(this.dropdownCloseSelected)
    },






    // イベントハンドラ
    onSetWideArea:function(areaName){
      //広域エリア選択時のイベント
      //表示用配列のフィルタ
      this.filterCity(areaName)
    },

    onSetCloseArea: function(){
      //都市選択時のイベント
      this.getWeatherData()
    }

  },



  mounted:function (){
    //ヘッダーへページ名のエミット
    eventHub.$emit('change-title','Weather');

    //リスト情報の取得
    this.getLocation();
  }
}
