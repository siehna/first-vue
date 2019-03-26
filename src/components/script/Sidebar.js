export default {
  data: function () {
    return {
      drawer: false,
      items: [
        {icon:'assignment',title: 'Todo', link: '/'},
        {icon:'assignment',title: 'CustomTodo', link: '/custom'},
        {icon:'settings_input_antenna',title: 'Weather', link: '/weather'},
        {icon:'settings_input_antenna',title: 'WeeklyWeather', link:'weekly'},
        {icon:'photo',title: 'Map', link:'map'}
      ]
    }
  },
  methods: {
    reverseDrawer:function(){
      this.drawer = !this.drawer
    // if(this.drawer){
    //   this.drawer = false
    //   return
    // }
    // this.drawer = true
    // return
    },
    // residterSidebarChange:function(){
    //   eventHub.$on('menu-click', this.reverseDrawer())
    // }
  },
  created(){
    eventHub.$on('menu-click', this.reverseDrawer);
  }
}
