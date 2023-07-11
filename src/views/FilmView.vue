<script setup>

    import CastComponent from "../components/CastComponent.vue"
    import TagComponent from "../components/TagComponent.vue"
    import HeartIcon from "../icons/heartIcon.png"
    import HeartIconHover from "../icons/heartIconHover.png"
    import heartIconSelected from "../icons/heartIconSelected.png"
</script>

<script>
    export default {
        computed:{
            filmId (){
                return this.$route.params.id
            }
        },
        data() {
            return {
                filmDetails: {},
                ratingValue: 0,
                ratingBackgroundColor: '',
                currentFavoriteIcon: HeartIcon,
                hoveringFavoriteIcon: false,
                favorited: false,
                creditsData: {},
                isMobile: false,
                favoriteJumping: false
            }
        },
        methods: {
            //api calls
            GetFilmDetails(){
                this.$GlobalFunctions.GetFilmDetails({filmId: this.filmId}).then(response => {
                    this.filmDetails = response
                    this.ratingValue = this.filmDetails.vote_average.toFixed(1)
                    this.CalculateRatingBackgroundColor()
                })  
            },
            CheckIfFavorited(){
                this.$GlobalFunctions.GetFilmFavoriteState({filmId: this.filmId}).then(response => {
                    this.favorited = response
                    this.UpdateFavoriteIconName()
                })
            },
            GetCredits(){
                this.$GlobalFunctions.GetCredits({filmId: this.filmId}).then(response => {
                    this.creditsData = response.cast
                })
            },

            //other
            FormatNumber(value){
                if(value == undefined){ return 'Loading...'}
                if(value == 0){ return 'Unavailable'}
                const formattedNumber = (value).toLocaleString(
                    undefined
                );
                return formattedNumber + '$'
            },
            CalculateRatingBackgroundColor(){
                this.ratingBackgroundColor = `hsl(${this.ratingValue*13}, 61%, 59%)` //*130/10 = 13
            },
            UpdateFavoriteIconName(){
                this.favorited ? this.currentFavoriteIcon = heartIconSelected : this.currentFavoriteIcon = HeartIcon
                this.hoveringFavoriteIcon = false
            },
            FavoriteStateChange(){
                this.favorited = !this.favorited
                this.favoriteJumping = true
                this.$GlobalFunctions.SetFavoriteState({filmId: this.filmDetails.id, favorited: this.favorited}).then(response => {
                    this.UpdateFavoriteIconName()
                    this.favoriteJumping = false
                })  
            },
            CheckMobile(){
                this.isMobile = window.document.body.clientWidth <= 600
            },
            ScrollToTop(){
                this.isMobile
                ? this.$refs.ref_FilmViewClass.scrollTo(0, -this.$refs.ref_FilmViewClass.scrollHeight)
                : this.$refs.ref_FilmViewClass.scrollTop = 0
            }
        },
        created() {
            window.addEventListener("resize", this.CheckMobile);
        },
        destroyed() {
            window.removeEventListener("resize", this.CheckMobile);
        },
        mounted() {
            this.CheckMobile()
            this.CheckIfFavorited()
            this.GetFilmDetails()
            this.GetCredits()
        },
        updated() {
            this.ScrollToTop()
        },
    }
</script>

<template>
    <div ref="ref_FilmViewClass" :class="'FilmViewClass'">
        <div :class="'FilmViewLeftDivClass'">
            <div :class="'FilmImageDivClass'">
                <img v-if="filmDetails.backdrop_path" draggable="false" :class="'FilmImageClass'" :src="'https://image.tmdb.org/t/p/w500/' + filmDetails.backdrop_path" alt="">
            </div>
            <div :class="'FilmViewLeftBottomDivClass'">
                <div :class="'FilmViewTaglineClass'">{{filmDetails.tagline}}</div>
                <hr :class="'hrClass'">
                <div>
                    <span :class="'FilmViewLeftBottomDivTitlesClass'">Budget: </span>
                    <span :class="'FilmViewLeftBottomDivInfoClass'">{{FormatNumber(filmDetails.budget)}}</span>
                </div>
                <div>
                    <span :class="'FilmViewLeftBottomDivTitlesClass'">Revenue: </span>
                    <span :class="'FilmViewLeftBottomDivInfoClass'">{{FormatNumber(filmDetails.revenue)}}</span>
                </div>
                <hr :class="'hrClass'">
                <div>
                    <span :style="{marginRight: '8px'}" :class="'FilmViewLeftBottomDivTitlesClass'">Tags:</span>
                    <TagComponent v-for="genre in filmDetails.genres">{{genre.name}}</TagComponent>
                </div>
                <!-- <div :style="{display: 'grid', justifyContent: 'center'}">
                    <span :style="{marginRight: '8px'}" :class="'FilmViewLeftBottomDivTitlesClass'">Companies involved:</span>
                    <img v-for="company in filmDetails.production_companies" :class="'ProductionCompanyImgClass'" :src="'https://image.tmdb.org/t/p/w500/' + company.logo_path" alt="">
                </div> -->
                <div :class="'CreditsDivClass'" v-if="isMobile">
                    <span :class="'CreditsTitleClass'">Credits</span>
                    <div :class="'CastDivClass'">
                        <CastComponent v-for="cast in creditsData" :id="cast.id" :department="cast.known_for_department" :imagePath="cast.profile_path" :originalName="cast.original_name"></CastComponent>
                    </div>
                </div>
            </div> 
        </div>
        <div :class="'FilmViewRightDivClass'">
            <div :class="'FilmViewTitleDivClass'">
                <span v-if="filmDetails.title != undefined" v-for="word in filmDetails.title.split(' ')" :class="'FilmViewTitles'">{{word + '&nbsp'}}</span>
                <span v-else :class="'FilmViewTitles'">Loading...</span>
                <div v-if="ratingValue" :style="{backgroundColor: ratingBackgroundColor}" :class="'FilmViewRatingDivClass'" >{{ ratingValue + '/10' }}</div>
            </div>
            <div :class="'FilmViewSubTitleDivClass'">
                <span>{{filmDetails.release_date != undefined ? filmDetails.release_date.split('-').reverse().join('.') : 'Loading...'}}</span>
                &nbsp
                &#x2022
                &nbsp
                <span :class="'OriginalLanguageSpanClass'">{{ filmDetails.original_language ? filmDetails.original_language.toUpperCase() : 'Loading...' }}</span>
                &nbsp
                &#x2022
                &nbsp
                <button :style="{opacity: hoveringFavoriteIcon || favorited ? '1' : '0.7'}" @click="FavoriteStateChange()" @mouseenter="hoveringFavoriteIcon = true" @mouseleave="hoveringFavoriteIcon = false" :class="'FilmMiniFavoriteButtonClass'"><img :class="favoriteJumping ? 'HeartIconJumpAnimClass' : null" :src="hoveringFavoriteIcon ? HeartIconHover : currentFavoriteIcon" alt=""></button>
            </div>
            <div :class="'FilmViewOverviewDivClass'">{{ filmDetails.overview }}</div>
            <div :class="'CreditsDivClass'" v-if="!isMobile">
                <span :class="'CreditsTitleClass'">Credits</span>
                <div :class="'CastDivClass'">
                    <CastComponent v-for="cast in creditsData" :id="cast.id" :department="cast.known_for_department" :imagePath="cast.profile_path" :originalName="cast.original_name"></CastComponent>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<style scoped>
.FilmViewClass{
    position: fixed;
    top: var(--header-height);
    width: 100vw;
    bottom: 0;
    left: 0;
    padding: 0;
    overflow-y: auto;
    display: flex;
}
.hrClass{
    margin: 3vh 0 3vh 0;
    border-color: rgb(187, 187, 187);
}
/* left  */
.FilmViewLeftDivClass{
    /* background-color: red; */
    width: var( --film-view-left-bar-width);   
}
.FilmImageDivClass{
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: rgb(63, 0, 0); */
}
.FilmImageClass{
    width: 90%;
    margin-top: 2vh;
    border-radius: 10px;
    user-select: none;
}
.FilmViewLeftBottomDivClass{
    width: 100%;
    padding: 2vh 2vw 0 2vw;
}
.FilmViewTaglineClass{
    color: rgb(181, 181, 181);
    font-size: calc(12px + 0.4vw);
    text-align: center;
}
/* right */
.FilmViewRightDivClass{
    width: calc(100% - var( --film-view-left-bar-width)); 
}
/* title */
.FilmViewTitles{
    font-size: calc(20px + 2vw);
    color: rgb(232, 232, 232);
    display: inline-block;
    margin-bottom: 2vh;
}
.FilmViewRatingDivClass{
    padding: 0.5vh 1vw 0.5vh 1vw;
    border-radius: 8px;
    font-size: calc(12px + 1vw);
    color: #222222;
    width: fit-content;
    display: inline-block;
    transform: translateY(calc(-4px - 0.1vw));
}

/* sub title */
.FilmViewSubTitleDivClass{
    font-size: calc(10px + 0.9vw);
    color: rgb(149, 149, 149);
    margin-top: calc(-2px - 0.4vw);
    margin-bottom: calc(2px + 0.4vw);
    display: flex;
    align-items: center;
}
.OriginalLanguageSpanClass{
    border: 2px solid rgb(149, 149, 149);
    font-size: calc(6px + 0.7vw);
    border-radius: 5px;
    padding: 1px 8px 1px 8px;
}
.FilmMiniFavoriteButtonClass{
    border: none;
    background-color: transparent;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    outline: none;
}
.FilmMiniFavoriteButtonClass img{
    height: 22px;
}
.FilmViewOverviewDivClass{
    font-size: 25px;
    padding-right: 2vw;
    color: rgb(201, 201, 201);
}
.FilmViewLeftBottomDivTitlesClass{
    color: rgb(218, 218, 218);
    font-size: 24px;
}
.FilmViewLeftBottomDivInfoClass{
    font-size: 24px;
    color: rgb(173, 173, 173);
}
.FilmViewTagsDivClass{
    padding: 1vh 1vw 1vh 1vw;
}
.ProductionCompanyImgClass{
    max-width: 50%;
    margin: 1vh 1vw 1vh 1vw;
    filter: invert(1) hue-rotate(180deg);
}
.CreditsDivClass{
    margin-top: 2vh;
}
.CreditsTitleClass{
    color: var(--light-font-color);
    font-size: calc(20px + 2vw);
}
.CastDivClass{
    justify-content: start;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 20px;
    margin-top: 1vh;
}
.CastTitleSpan{
    font-size: calc(20px + 2vw);
    color: rgb(232, 232, 232);
    display: inline-block;
    margin: 2vh 0 2vh 0;
}


@media screen and (max-width: 600px) {
    .FilmViewClass {
        flex-direction: column-reverse;
    }
    .FilmViewRightDivClass{
        width: 100%;
        padding: 5vw;
    }
    .FilmViewLeftDivClass{
        width: 100%;
        padding: 5vw;
        margin-bottom: 8vh;
    }
}
</style>