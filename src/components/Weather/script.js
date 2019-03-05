import axios from 'axios';
export default{
  // el:'weather',
  name:'weather-component',
  data(){
    return{
      dateLabel:'empty',
      telop:'no data',
      date:'no data',
      text:'no text',
      min:null,
      max:null,
      iconUrl:null,
      bottomNav: '',
      //0:今日 1:明日 2:明後日
      when: 1
    }
  },
  method:{
    getData: function () {
      axios
        .get('http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
        .then(response => {
          this.dateLabel=response['data']['forecasts'][this.when]["dateLabel"]
          this.telop=response['data']['forecasts'][this.when]["telop"]
          this.iconUrl=response['data']['forecasts'][this.when]["image"]["url"]
          this.date=response['data']['forecasts'][this.when]["date"]
          this.min=response['data']['forecasts'][this.when]["temperature"]["min"]["celsius"]
          this.max=response['data']['forecasts'][this.when]["temperature"]["max"]["celsius"]
          this.text=response['data']['description']['text']
          this.info=response['data']['forecasts'][this.when]
          console.log(response)
        })
        .catch(err => {this.info='fault to get API'});
    }
  },
  mounted:function (){
    //ヘッダーへのエミット
    eventHub.$emit('change-title','Weather');
    //天気情報の取得
    axios
      .get('http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
      .then(response => {
        this.dateLabel=response['data']['forecasts'][this.when]["dateLabel"]
        this.telop=response['data']['forecasts'][this.when]["telop"]
        this.iconUrl=response['data']['forecasts'][this.when]["image"]["url"]
        this.date=response['data']['forecasts'][this.when]["date"]
        this.min=response['data']['forecasts'][this.when]["temperature"]["min"]["celsius"]
        this.max=response['data']['forecasts'][this.when]["temperature"]["max"]["celsius"]
        this.text=response['data']['description']['text']
        this.info=response['data']['forecasts'][this.when]
        console.log(response)
      })
      .catch(err => {this.info='fault to get API'});
  }
}
