import axios from 'axios';
export default{
  // el:'weather',
  name:'weather-component',
  data(){
    return{
      info:'no response',
      dateLabel:null,
      telop:null,
      date:null
    }
  },
  mounted:function (){
    //ヘッダーへのエミット
    eventHub.$emit('change-title','Weather');
    //天気情報の取得
    axios
      .get('http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
      .then(response => {
        this.dateLabel=response['data']['forecasts'][0]["dateLabel"]
        this.telop=response['data']['forecasts'][0]["telop"]
        this.date=response['data']['forecasts'][0]["date"]
        this.info=response['data']['forecasts'][0]
        console.log(response)
      })
      .catch(err => {this.info='fault to get API'});
  }
}
