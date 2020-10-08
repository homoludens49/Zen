import Vue from 'vue'
import Router from 'vue-router'
import Products from '../views/Products.vue'
import Orders from '../views/Orders.vue'
import Dashboard from '../views/Dashboard.vue'
import MainPage from '../views/MainPage.vue'
import Movements from '../views/Movements.vue'

Vue.use(Router);

export default new Router({
    routes:[{
        path:'/products',
        name:'products',
        component: Products
    },
    {
        path:'/orders',
        name:'orders',
        component: Orders
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: Dashboard
    },
    {
        path:'/MainPage',
        name:'MainPage',
        component: MainPage
    },
    {
        path:'/Movements',
        name:'Movements',
        component: Movements
    }
]
}); 