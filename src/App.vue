<template>
  <div id="app">
    <ContentHeader></ContentHeader>
    <router-view></router-view>
    aaa
  </div>
</template>

<script>
   import ContentHeader from '@/components/Header/header'

  export default {
    name: 'app',
    components: {
      ContentHeader
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
</style>
