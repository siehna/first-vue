import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/components/Todo/Todo'
import CustomTodo from '@/components/CustomTodo/CustomTodo'
import Weather from '@/components/Weather/Weather'
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
    }
  ]
})
