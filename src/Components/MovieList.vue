<template>
    <div id="movie-list">
        <div v-if="filterMovies.length">
            <movie-item v-for="movie in filterMovies" :movie="movie.movie">
                <div class="movie-sessions">
                    <div
                            v-for="session in filteredSessions(movie.sessions)"
                            class="session-time-wrapper tooltip-wrapper"
                            v-tooltip="{ seats:session.seats }"
                    >
                        <div class="session-time">{{formatSessionTime(session.time)}}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
           {{noResults}}
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>

<script>

    import genres from '../util/genres';
    import times from '../util/times';
    import MovieItem from './MovieItem.vue'

    export default {
        data(){
            return{

            }
        },

        props:['genre','time','movies','day'],
        methods:{
            moviePassesGenreFilter(movie){
                if(!this.genre.length){
                    return true;
                }else{
                    let movieGenres =  movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre=>{
                        if(movieGenres.indexOf(genre)===-1){
                            matched = false;
                        }
                    });
                    return matched;
                }

            },
            formatSessionTime(raw){
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions){
                return sessions.filter(this.sessionPassesTimeFilter)
            },

            sessionPassesTimeFilter(session){
                if(!this.day.isSame(this.$moment(session.time),'day')){
                    return false;
                }else if(this.time.length === 0 || this.time.length === 2 ){
                    return true;
                }else if(this.time[0] === times.AFTER_6PM){
                    return this.$moment(session.time).hour() >= 18;
                }else{
                    return this.$moment(session.time).hour() < 18;
                }

            }
        },
        computed:{
            filterMovies(){
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter(movie=>movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResults(){
                let times = this.time.join(', ');
                let genres = this.genre.join(', ');
                return `No results for ${times} ${times.length && genres.length ? ', ' :''} ${genres}.`;
            }
        },
        components:{
            MovieItem
        }
    }
</script>

<style scoped>

</style>