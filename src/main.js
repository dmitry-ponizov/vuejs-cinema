import Vue from 'vue';
import './style.scss';

// import Overview from './components/Overview.vue'

import moment from 'moment-timezone/moment-timezone';

moment.tz.setDefault("UTC");

Object.defineProperty(Vue.prototype,'$moment',{ get(){return this.$root.moment} });

import VueResource from 'vue-resource';

Vue.use(VueResource);

const bus = new Vue();

Object.defineProperty(Vue.prototype,'$bus',{get(){return this.$root.bus}});

import {checkFilter,setDay} from "./util/bus";

import  VueRouter from 'vue-router'

Vue.use(VueRouter);
import routes from './util/routes'

const router = new VueRouter({routes});

import Tooltip from './util/tooltip';

Vue.use(Tooltip);

new Vue({
    el:'#app',
    data:{
        genre:[],
        time:[],
        movies:[],
        moment,
        day:moment(),
        bus
    },
    methods:{

    },
    components:{

    },
    created(){
        this.$http.get('/api').then(response=>{
            this.movies = response.data;
        });
        this.$bus.$on('check-filter',checkFilter.bind(this));
        this.$bus.$on('set-day',setDay.bind(this));
    },
    router
});

