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
      areaName:'',
      cityName:'',
      cityId:'',


      dropdown_wide: [],
      dropdown_close: [],
      dropdown_close_selected:[],


      num: 1
    }
  },




  methods:{
    // クリックするとAPI取得ができるメソッド
    //天気情報の取得
    getWeatherData: function () {
      // リストIdから情報の取得
      //APIの読み込み
      axios
        .get('http://weather.livedoor.com/forecast/webservice/json/v1?city=' + this.cityCode)//Idにすると404が出る、要質問
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
          var prefLength = responseXml['data'].getElementsByTagName('pref').length
          for(var i=0; i<prefLength; i++){
            // this.$set(this.dropdown_wide, i, responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent)
            this.dropdown_wide.push({
              text:responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent,
              callback:()=> console.log(responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent)
            })

            //小規模エリアリストにプッシュ（連想配列）
            var childrenLength=responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city').length
            for(var j=0; j<childrenLength; j++){
              this.dropdown_close.push({
                area:responseXml['data'].getElementsByTagName('pref')[i].attributes['title'].textContent,
                text: responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city')[j].attributes['title'].textContent,
                id: responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city')[j].attributes['id'].textContent,
                callback: () => console.log(responseXml['data'].getElementsByTagName('pref')[i].getElementsByTagName('city')[j].attributes['title'].textContent)
              })
            }
          }
          this.dropdown_close_selected = this.dropdown_close.concat()
          console.log(this.dropdown_wide)
          console.log(childrenLength)
          console.log(this.dropdown_close)
          console.log(this.dropdown_close_selected)
          console.log('道南')//関数の動作確認（決め打ち）
          this.filterCity("道南")


          // this.areaName=responseXml['data'].getElementsByTagName('pref')[20].attributes['title'].textContent
          // this.cityName=responseXml['data'].getElementsByTagName('pref')[20].getElementsByTagName('city')[0].attributes['title'].textContent
          // this.cityId=responseXml['data'].getElementsByTagName('pref')[20].getElementsByTagName('city')[0].attributes['id'].textContent+''
          // // console.log(responseXml)
          // console.log(this.dropdown_wide)
          // console.log(this.areaName)
          // console.log(this.cityName)
          // console.log('city ID : '+this.cityId)
          // console.log('city Code : '+this.cityCode)
        })
    },
    
    
    
    filterCity: function (key) {
      // area と同じ text (都市名)のものを selected に入れる
      this.dropdown_close_selected=[]
      for(key in this.dropdown_close){
        this.dropdown_close_selected.push({
          text:this.dropdown_close[key].text,
          callback: () => console.log(this.dropdown_close[key].text)
        })
      }
      console.log("area="+key)
      console.log(this.dropdown_close_selected)
    }

  },



  mounted:function (){
    //ヘッダーへページ名のエミット
    eventHub.$emit('change-title','Weather');

    //リスト情報の取得
    this.getLocation();
  }
}
