import axios from 'axios';
export default{
  // el:'weather',
  name:'weather-component',
  data(){
    return{
      info:'no response'
    }
  },
  mounted:function (){
    eventHub.$emit('change-title','Weather' );
    axios
      .get('http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
      .then(response => {this.info=response})
      .catch(err => {this.info='fault to get API'});
  }
}
