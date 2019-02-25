import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Todo from '@/components/Todo/Todo'
import CustomTodo from '@/components/CustomTodo/CustomTodo'

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
    }
  ]
})
