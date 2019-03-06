export default{
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
  // data: () => ({
  //   drawer: true,
  //   items: [
  //     {title: 'Todo', link: '/'},
  //     {title: 'CustomTodo', link: '/custom'},
  //     {title: 'Weather', link: '/weather'}
  //   ]
  //   items2: [
  //     { picture: 28, text: 'Joseph' },
  //     { picture: 38, text: 'Apple' },
  //     { picture: 48, text: 'Xbox Ahoy' },
  //     { picture: 58, text: 'Nokia' },
  //     { picture: 78, text: 'MKBHD' }
  //   ]
  // }),

  methods:{
    changeTitle: function(componentName){
      this.title = componentName
    }
    // menuChange: function(){
    //   eventHub.$emit('menu-click')
    // }
  },

  created: function (){
    eventHub.$on('change-title', this.changeTitle);
  }
}
