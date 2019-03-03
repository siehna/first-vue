import axios from 'axios';
export default{
  // el:'weather',
  name:'weather-component',
  data(){
    return{
      info:'no response',
      dateLabel:'empty',
      telop:'no data',
      date:'no data',
      //0:今日 1:明日 2:明後日
      when: 1
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
        this.date=response['data']['forecasts'][this.when]["date"]
        this.info=response['data']['forecasts'][this.when]
        console.log(response)
      })
      .catch(err => {this.info='fault to get API'});
  }
}
