<template>
  <div>
    <h2>{{ title }}</h2>
    <img src="../../assets/logo.png">
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data: function () {
      return {
        title: 'コンポーネントを選択してください'
      }
    },
    methods: {
      changeTitle: function(componentName){
        console.log(componentName)
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
</script>

<style scoped></style>
