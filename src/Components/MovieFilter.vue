<template>
    <div id="movie-filter">
        <h2>Filter results</h2>
        <h3>By time of day</h3>
        <div class="filter-group">
            <check-filter v-for="time in times" :title="time" category="time"  :key="time"></check-filter>
        </div>
        <h3>By genre</h3>
        <div class="filter-group">
            <check-filter v-for="genre in genres" :title="genre" category="genre" :key="genre"></check-filter>
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import CheckFilter from './CheckFilter.vue';

    export default {
        data(){
            return{
                genres,
                times
            }
        },

        methods:{

        },
        components:{
           CheckFilter
        }
    }
</script>

<style scoped>

</style>