export default {
  name: 'hello',
  data: function () {
    return {
      title: 'Todo'
    }
  },
  methods: {
    changeTitle: function(componentName){
      this.title = componentName
    },
    // drawerInOut:function(drawer){
    // }
  },
  //最初に呼ばれる
  mounted(){
    // alert('呼ばれました') タイトルを変えるメソッド
    // this.changeTitle('changed')
  },
  created: function () {
    eventHub.$on('change-title', this.changeTitle);
    eventHub.$emit('menu-click', !drawer);
  }
}
