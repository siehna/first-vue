
export default {
  methods:{
    getMap:function(){
      let MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516)
      let Options = {
        zoom: 15,      //地図の縮尺値
        center: MyLatLng,    //地図の中心座標
        mapTypeId: 'roadmap'   //地図の種類
      };
      let map = new google.maps.Map(document.getElementById('map'), Options)
    }
  },

  mounted: function(){
    eventHub.$emit('change-title','Map')
    this.getMap()
  }
}
