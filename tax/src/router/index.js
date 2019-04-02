import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index.vue'
// import Reconciliation from '@/components/main/reconciliation.vue'
// import Details from '@/components/main/details.vue'
Vue.use(Router)

const Index=()=>import('../components/index.vue')
const Reconciliation=()=>import('../components/main/reconciliation.vue')
const Details =() =>import('../components/main/details.vue')
export default new Router({
  routes: [
    {
      path:'/',
      redirect:{
        name:'Index'
      }
    },

    {
      path: '/index',
      name: 'Index',
      component: Index,
      children:[
        {
          path:'/reconciliation',
          component:Reconciliation,
        },
        {
            path:'/details/',
            name:'details',
            component:Details
        }
      ]
    },
  ]
})

