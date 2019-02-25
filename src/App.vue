<template>
  <div id="app">
    <ContentHeader></ContentHeader>
    <Sidebar></Sidebar>
    <router-view></router-view>
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
</style>
