<script setup>
    import FilmMini from '../components/FilmMini.vue';
    import PageNavigationComponent from '../components/PageNavigationComponent.vue'
</script>

<script>
    export default {
        data() {
            return {
                filmsData: {},
                favoritesData: {},
                allFavoritesFilmIds: [],
                page: 1,
                searchData: {},
                searching: false,
                searchContent: "",
                maxPageCount: 500,
                GetFilmDataFunction: function(){},
                GetSearchedFilmDataFunction: function(){},
                userId: 20106117,
                viewMode: ''
            }
        },
        methods: {
            //api call functions
            GetPopulerFilms() {
                this.SetProgressBarState(true)
                this.$GlobalFunctions.GetPopularFilms({page: this.page}).then(response => {
                    this.filmsData = response
                    this.MaxPageUpdater(this.filmsData.total_pages)
                    this.SetProgressBarState(false)
                })
            },
            GetSearchedPopulerFilms(){
                this.SetProgressBarState(true)
                this.$GlobalFunctions.GetSearchedPopulerFilms({searchContent: this.searchContent, page: this.page}).then(response => {
                    this.searchData = response
                    this.MaxPageUpdater(this.searchData.total_pages)
                    this.SetProgressBarState(false)
                })
            },
            GetFavoriteFilms() {
                this.SetProgressBarState(true)
                this.$GlobalFunctions.GetFavoriteFilms({userId: this.userId, page: this.page}).then(response => {
                    this.favoritesData = response
                    if(this.viewMode == "favorites") this.filmsData = this.favoritesData
                    this.MaxPageUpdater(this.filmsData.total_pages)
                    this.SetProgressBarState(false)
                })
            },
            GetSearchedFavoriteFilms(){
                this.SetProgressBarState(true)
                const searchContentTemp = this.searchContent.toLocaleLowerCase()
                this.searchData.results = this.filmsData.results.filter(function (el) {
                    return el.title.toLowerCase().includes(searchContentTemp)
                    this.SetProgressBarState(false)
                });
            },
            MaxPageUpdater(maxPage){
                if(maxPage > 500){
                    this.maxPageCount = 500
                }
                else{
                    this.maxPageCount  = maxPage
                }
            },
            PageUpdate(page){
                this.page = page   
            },
            OnRouteChange(){
                this.searching = false
                this.searchContent = ""
                if(this.viewMode == "home"){
                    this.GetFilmDataFunction = this.GetPopulerFilms
                    this.GetSearchedFilmDataFunction = this.GetSearchedPopulerFilms
                }
                else if(this.viewMode == "favorites"){
                    this.GetFilmDataFunction = this.GetFavoriteFilms
                    this.GetSearchedFilmDataFunction = this.GetSearchedFavoriteFilms
                }
                this.PageUpdate(1)
                this.$refs.ref_PageNavigationComponent.OverridePage(1);
                this.GetFavoriteFilms()
                this.GetFilmDataFunction()
                
            },
            CheckIfFavorited(id){
                return this.$GlobalFunctions.CheckIfFavorited(this.favoritesData.results, id)
            },
            SetProgressBarState(state){
                this.$emit('ProgressBarStateUpdate', state)
            }
        },
        mounted() {
            this.viewMode = this.$route.name
            this.OnRouteChange()
            
        },
        watch:{
            page:{
                handler: function(){
                    this.searching ? this.GetSearchedFilmDataFunction() : this.GetFilmDataFunction()
                }
            },
            searchContent:{
                handler: function(){
                    this.searchContent != "" ? this.searching = true : this.searching = false

                    if(this.page == 1){
                        this.searching ? this.GetSearchedFilmDataFunction() : this.GetFilmDataFunction()
                        return
                    }
                    this.$refs.ref_PageNavigationComponent.OverridePage(1);
                }
            },
            '$route.name'(newName, oldName) {
                if(oldName != newName){
                    this.viewMode = newName
                    this.OnRouteChange()
                }
            }
        }
    }
</script>

<template>
    <div :class="'HomeViewClass'">
        <div :class="'SearchDivClass'">
            <input @input="this.searchContent = $event.target.value" :value="this.searchContent" :placeholder="'Search'" :class="'SearchInputClass'" type="text">
        </div>
        <div v-if="!this.searching" :class="'PopularFilmsDivClass'">
            <span :class="'PopularFilmsTitleClass'">{{ this.viewMode == "home" ? 'Popular Films' : 'Favorite Films' }}</span>
            <FilmMini v-for="film in filmsData.results" :filmId="film.id" :imagePath="film.poster_path" :filmOverview="film.overview" :releaseDate="film.release_date != undefined ? film.release_date.slice(0,4) : 'N/A'" :rating="film.vote_average" :title="film.title" :onStartFavorited="this.CheckIfFavorited(film.id)"/>
        </div>
        <div v-else :class="'PopularFilmsDivClass'">
            <span :class="'PopularFilmsTitleClass'">Search Films</span>
            <FilmMini v-for="film in searchData.results" :filmId="film.id" :imagePath="film.poster_path" :filmOverview="film.overview" :releaseDate="film.release_date != undefined ? film.release_date.slice(0,4) : 'N/A'" :rating="film.vote_average" :title="film.title" :onStartFavorited="this.CheckIfFavorited(film.id)"/>
        </div>
        <PageNavigationComponent ref="ref_PageNavigationComponent" :maxPageCount="maxPageCount" @pageUpdate="PageUpdate"/>
    </div>
</template>

<style scoped>
.HomeViewClass{
    position: fixed;
    top: var(--header-height);
    width: 100vw;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    z-index: 5;
}
.PopularFilmsDivClass{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding-left: var(--gap-between-film-minis);
}
.PopularFilmsDivClass::-webkit-scrollbar {
    width: 0px;
}
.PopularFilmsTitleClass{
    font-size: 6vh;
    color: var(--light-font-color);
    width: 100%;
    margin: 2vh 0 2vh 2vw;
}
.SearchInputClass{
    border: none;
    outline: none;
    background-color: #393939;
    color: var(--light-font-color);
    font-size: 22px;
    padding: 0.5vh 1vw 0.5vh 1vw;
    border-radius: 6px;
    text-align: center;
    width: calc(100px + 10vw);
}
.SearchDivClass{
    position: fixed;
    right: 0;
    top: 0;
    height: var(--header-height);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2vw;
}
</style>
