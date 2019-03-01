export default {
  data: function () {
    return {
      drawer: true,
      items: [
        {title: 'Todo', link: '/'},
        {title: 'CustomTodo', link: '/custom'},
        {title: 'Weather', link: '/weather'}
      ]
    }
  },
  method :{
    reverseDrawer:function(){
      // this.drawer = !this.drawer;
    if(this.drawer){
      this.drawer = false
      return
    }
    this.drawer = true
    return
    }
  },
  created(){
    eventHub.$on('menu-click', this.reverseDrawer());
  }
}
