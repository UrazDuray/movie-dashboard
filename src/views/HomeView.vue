<script setup>
    import FilmMini from '../components/FilmMini.vue';
    import PageNavigationComponent from '../components/PageNavigationComponent.vue'
</script>

<script>
    export default {
        props:{
            searchContent: String
        },
        data() {
            return {
                filmsData: {},
                favoritesData: {},
                allFavoritesFilmIds: [],
                page: 1,
                searchData: {},
                searching: false,
                maxPageCount: 500,
                GetFilmDataFunction: function(){},
                GetSearchedFilmDataFunction: function(){},
                userId: 20106117,
                viewMode: '',
                ScrollToTop: function(){}
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
                const searchContentTemp = this.searchContent.toLocaleLowerCase()
                this.searchData.results = this.filmsData.results.filter(function (el) {
                    return el.title.toLowerCase().includes(searchContentTemp)
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
            PageUpdate(page, scrollToTop){
                this.page = page
                if(scrollToTop) this.ScrollToTop()
            },
            OnRouteChange(){
                this.searching = false
                this.$emit('OverrideSearchContent', "")
                if(this.viewMode == "home"){
                    this.GetFilmDataFunction = this.GetPopulerFilms
                    this.GetSearchedFilmDataFunction = this.GetSearchedPopulerFilms
                }
                else if(this.viewMode == "favorites"){
                    this.GetFilmDataFunction = this.GetFavoriteFilms
                    this.GetSearchedFilmDataFunction = this.GetSearchedFavoriteFilms
                }
                this.PageUpdate(1, true)
                this.$refs.ref_PageNavigationComponent.OverridePage(1);
                this.GetFavoriteFilms()
                this.GetFilmDataFunction()
                this.ScrollToTop()
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
            this.ScrollToTop = function(){
                this.$refs.ref_HomeViewClass.scroll({top: 0, behavior: "smooth"})
            }
            
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
    <div ref="ref_HomeViewClass" :class="'HomeViewClass'">
        <div :class="'NoResultsDiv'" v-if="searchData.results && searchData.results.length == 0">
            <span>Couldn't find the movie you are looking for</span>
        </div>
        <div v-else>
            <div v-if="!searching" :class="'PopularFilmsDivClass'">
                <span :class="'PopularFilmsTitleClass'">{{ viewMode == "home" ? 'Popular Films' : 'Favorite Films' }}</span>
                <FilmMini v-for="film in filmsData.results" :filmId="film.id" :imagePath="film.poster_path" :filmOverview="film.overview" :releaseDate="film.release_date != undefined ? film.release_date.slice(0,4) : 'N/A'" :rating="film.vote_average" :title="film.title" :onStartFavorited="CheckIfFavorited(film.id)"/>
            </div>
            <div v-else :class="'PopularFilmsDivClass'">
                <span :class="'PopularFilmsTitleClass'">Search Films</span>
                <FilmMini v-for="film in searchData.results" :filmId="film.id" :imagePath="film.poster_path" :filmOverview="film.overview" :releaseDate="film.release_date != undefined ? film.release_date.slice(0,4) : 'N/A'" :rating="film.vote_average" :title="film.title" :onStartFavorited="CheckIfFavorited(film.id)"/>
            </div>
        </div>
        <PageNavigationComponent ref="ref_PageNavigationComponent" :maxPageCount="maxPageCount" @PageUpdate="PageUpdate"/>
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
.NoResultsDiv{
    width: 100%;
    height: calc(100% - var(--page-nav-height) - var(--header-height));
    font-size: 40px;
    color: #a0a0a0;
    padding: 2vh 2vw 2vh 2vw;
    display: flex;
    text-align: center;
    align-items: center;
}
</style>
