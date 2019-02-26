<template>
  <div id="app">
    <ContentHeader class="top"></ContentHeader>
    <Sidebar class="side"></Sidebar>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
   import ContentHeader from '@/components/Header/Header'
   import Sidebar from '@/components/Sidebar/Sidebar'

  export default {
    name: 'app',
    components: {
      ContentHeader,
      Sidebar
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  /*.top{*/
    /*height: 10vw;*/
    /*background-color: aqua;*/
  /*}*/
  .side{
    float: left;
    width: 25% ;
    background-color: aquamarine;
    height: 30vh;
    /*border-right-color: brown;*/
    /*border-right-width: 100px;*/
  }
  .content{
    float: left;
    width: 75% ;
    height: 30vh;
    background-color: thistle;
  }
</style>
