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
      // max:['empty','empty','empty'],
      // min:['empty','empty','empty'],
      iconUrl:null,
      cityCode:130010,
      bottomNav: '',
      areaName:'',
      cityName:'',
      cityId:'',


      dropdown_wide: ['Arial', 'Calibri', 'Courier', 'Verdana'],
      dropdown_close: [
        { text: 'list', callback: () => console.log('list') },
        { text: 'favorite', callback: () => console.log('favorite') },
        { text: 'delete', callback: () => console.log('delete') }
      ],


      num: 1
    }
  },
  methods:{
    // クリックするとAPI取得ができるメソッド
    pickUpData: function () {
      for(var num=0; num<3; num++){
        axios
          .get('http://weather.livedoor.com/forecast/webservice/json/v1?city='+this.cityCode)
          .then(response => {
            this.dateLabel=response['data']['forecasts'][num]["dateLabel"]
            this.telop=response['data']['forecasts'][num]["telop"]
            this.iconUrl=response['data']['forecasts'][num]["image"]["url"]
            this.date=response['data']['forecasts'][num]["date"]
            // this.min=response['data']['forecasts'][num]["temperature"]["min"]["celsius"]
            // this.max=response['data']['forecasts'][num]["temperature"]["max"]["celsius"]
            this.text=response['data']['description']['text']
            this.info=response['data']['forecasts'][num]
            // console.log(response)
          })
          .catch(err => {this.info='fault to get API'});
      }
    },

    getLocation: function(){
      axios
        .get('http://weather.livedoor.com/forecast/rss/primary_area.xml',{responseType:'document'})
        .then(responseXml =>{
          // console.log(responseXml)
          this.areaName=responseXml['data'].getElementsByTagName('pref')[20].attributes['title'].textContent
          this.cityName=responseXml['data'].getElementsByTagName('pref')[20].getElementsByTagName('city')[0].attributes['title'].textContent
          this.cityId=responseXml['data'].getElementsByTagName('pref')[20].getElementsByTagName('city')[0].attributes['id'].textContent+''
          console.log(this.areaName)
          console.log(this.cityName)
          console.log(this.cityId)
          console.log(this.cityCode)
        })
    }
  },
  mounted:function (){
    //ヘッダーへのエミット
    eventHub.$emit('change-title','Weather');
    this.getLocation();
    //天気情報の取得
    // for(var num=0; num<3; num++){
    axios
      .get('http://weather.livedoor.com/forecast/webservice/json/v1?city='+this.cityCode)//Idにすると404が出る、要質問
      .then(response => {
        this.dateLabel=response['data']['forecasts'][this.num]["dateLabel"]
        this.telop=response['data']['forecasts'][this.num]["telop"]
        this.iconUrl=response['data']['forecasts'][this.num]["image"]["url"]
        this.date=response['data']['forecasts'][this.num]["date"]
        // this.min=response['data']['forecasts'][num]["temperature"]["min"]["celsius"]
        // this.max=response['data']['forecasts'][num]["temperature"]["max"]["celsius"]
        this.text=response['data']['description']['text']
        // this.info=response['data']['forecasts'][this.num]
        // console.log(response)
      })
      .catch(err => {this.info='fault to get API'})
  }
}
