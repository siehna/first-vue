export default {
  drawer: true,
  data: function () {
    return {
      items: [
        {title: 'Todo', link: '/'},
        {title: 'CustomTodo', link: '/custom'},
        {title: 'Weather', link: '/weather'}
      ]
    }
  },
  method :{
    reverseDrawer:()=>{
      this.drawer = !this.drawer
    }
  }
}
