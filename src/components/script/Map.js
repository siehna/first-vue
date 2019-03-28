
export default {
  methods:{
    getMap:function(){
      let MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516)
      let Options = {
        zoom: 15,
        // scrollwheel:false,
        center: MyLatLng,
        mapTypeId: 'roadmap'
      }
      let map = new google.maps.Map(document.getElementById('map'), Options)
      console.log(map.getCenter())
    }
  },

  mounted: function(){
    eventHub.$emit('change-title','Map')
    this.getMap()
  }
}
