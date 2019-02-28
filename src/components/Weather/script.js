export default{
  name:'weather-component',
  mounted:function () {
    eventHub.$emit('change-title','Weather' )
  }
}
