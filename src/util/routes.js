import Overview from '../components/Overview.vue'
import Detail from '../components/Detail.vue'

export default [
    {path:'/',component:Overview,name:'home'},
    {name:'movie',path:'/movie/:id',component:Detail},
    {path:'*',redirect:{name:'home'}}
];