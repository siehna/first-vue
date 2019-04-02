export default {
  data: function () {
    return {
      drawer: false,
      items: [
        {icon:'assignment',title: 'Todo', link: '/'},
        {icon:'assignment',title: 'CustomTodo', link: '/custom'},
        {icon:'settings_input_antenna',title: 'Weather', link: '/weather'},
        {icon:'settings_input_antenna',title: 'WeeklyWeather', link:'weekly'},
        {icon:'photo',title: 'Map', link:'map'},
        {icon:'camera_alt',title: 'Camera', link:'camera'}
      ]
    }
  },
  methods: {
    reverseDrawer:function(){
      this.drawer = !this.drawer
    }
  },
  created(){
    eventHub.$on('menu-click', this.reverseDrawer);
  }
}
