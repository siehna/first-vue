import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/components/vue/Todo'
import CustomTodo from '@/components/vue/CustomTodo'
import Weather from '@/components/vue/Weather'
import WeeklyWeather from '@/components/script/WeeklyWeather'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: Todo
    },
    {
      path:'/custom',
      name:'CustomTodo',
      component:CustomTodo
    },
    {
      path:'/weather',
      name:'Weather',
      component: Weather
    },
    {
      path:'/weekly',
      name:'WeeklyWeather',
      component:WeeklyWeather
    }
  ]
})
