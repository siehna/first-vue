export default {
  name: 'hello',
  data: function () {
    return {
      title: 'no component'
    }
  },
  methods: {
    changeTitle: function(componentName){
      this.title = componentName
    }
  },
  //最初に呼ばれる
  mounted(){
    // alert('呼ばれました') タイトルを変えるメソッド
    // this.changeTitle('changed')
  },
  created: function () {
    eventHub.$on('change-title', this.changeTitle)
  }
}
