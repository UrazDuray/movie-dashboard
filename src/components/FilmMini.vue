<script setup>
    import HeartIcon from "../icons/heartIcon.png"
    import HeartIconHover from "../icons/heartIconHover.png"
    import heartIconSelected from "../icons/heartIconSelected.png"
</script>

<script>
    export default {
        props: {
            imagePath: String,
            title: String,
            rating: Number,
            onStartFavorited: Boolean,
            releaseDate: String,
            filmOverview: String,
            filmId: Number,
            userId: 20106117
        },
        computed:{
            ratingBackgroundColor(){
                return `hsl(${this.rating*13}, 61%, 59%)` //*130/10 = 13
            }
        },
        data() {
            return {
                currentFavoriteIcon: HeartIcon,
                filmMiniImageHover: false,
                hoveringFavoriteIcon: false,
                favorited: Boolean,
            }
        },
        methods: {
            UpdateFavoriteIconName(){
                this.favorited ? this.currentFavoriteIcon = heartIconSelected : this.currentFavoriteIcon = HeartIcon
                this.hoveringFavoriteIcon = false
            },
            OpenFilmDetails(){
                this.$router.push('/film/' + this.filmId)
            },
            FavoriteStateChange(){
                this.favorited = ! this.favorited
                this.$GlobalFunctions.SetFavoriteState({userId: this.userId, filmId: this.filmId, favorited: this.favorited}).then(response => {
                    this.UpdateFavoriteIconName()
                })
            }
        },
        mounted() {
            this.favorited = this.onStartFavorited
            this.UpdateFavoriteIconName()
        },
        watch:{
            onStartFavorited:{
                handler: function (){
                    this.favorited = this.onStartFavorited
                    this.UpdateFavoriteIconName()
                } 
            }
        }

    }
</script>

<template>
    <div :class="'FilmMiniClass'">
        <div @click="OpenFilmDetails" @mouseenter="filmMiniImageHover = true" @mouseleave="filmMiniImageHover = false" :class="'FilmMiniImageDivClass'">   
            <img v-if="imagePath" draggable="false" :class="['FilmMiniImageClass', filmMiniImageHover ? 'FilmMiniImageClassZoomInClass': null]" :src="'https://image.tmdb.org/t/p/w500/' + imagePath" alt="Poster Unavailable">
            <span :class="['FilmMiniOverviewSpanClass', filmMiniImageHover ? 'FilmMiniOverviewSpanHoverClass': null]">{{ filmOverview }}</span>
        </div>
        <div :class="'FilmMiniBottomDivClass'">
            <div :class="'FilmMiniBottomDivTitleDivClass'">
                <span :class="'FilmMiniBottomDivTitleClass'">{{title}}</span>
            </div>
            
            <div :class="'FilmMiniBottomDivBottomClass'">
                <div :class="'FilmMiniDateDivClass'">{{releaseDate}}</div>
                <div :style="{backgroundColor: ratingBackgroundColor}" :class="'FilmMiniRatingDivClass'">{{rating.toFixed(1)}}</div>
                <button @click="FavoriteStateChange()" @mouseenter="hoveringFavoriteIcon = true" @mouseleave="hoveringFavoriteIcon = false" :class="'FilmMiniFavoriteButtonClass'"><img :src="hoveringFavoriteIcon ? HeartIconHover : currentFavoriteIcon" alt=""></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.FilmMiniClass{
    box-shadow: 6px 6px 6px 0px rgba(17, 17, 17, 0.75);
    border-radius: 1vw 1vw 0.5vw 0.5vw;
    width: var(--film-mini-width);
    height: var(--film-mini-height);
    margin: 1vh 0.5vw 1vh 0.5vw;
    transition-duration: 150ms;
    user-select: none;
    display: grid;
}
/* film mini image div */
.FilmMiniImageDivClass{
    width: var(--film-mini-width);
    height: var(--film-mini-image-height);
    border-radius: 1vw 1vw 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    text-align: center;
    display: -webkit-box;
}
.FilmMiniImageClass{
    width: 100%;
    height: 100%;
    border-radius: 1vw 1vw 0vw 0vw;
    transition: opacity 250ms ease-in, filter 250ms ease-in, transform 250ms ease-in;
    transform: scale(1);
}
.FilmMiniImageClassZoomInClass{
    transition: transform 3000ms ease-in;
    transform: scale(1.2);
    opacity: 0.3;
    filter: blur(2px);
}
.FilmMiniOverviewSpanClass{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1vw;
    opacity: 0;
    transition: opacity 250ms ease-in;
    color: rgb(167, 167, 167);
}
.FilmMiniOverviewSpanHoverClass{
    opacity: 1;
}

/* bottom div */
.FilmMiniBottomDivClass{
    width: var(--film-mini-width);
    height: calc(var(--film-mini-height) - var(--film-mini-image-height));
    display: grid;
    row-gap: 0;
    column-gap: 0;
    text-align: center;
    padding-top: 1vh;
    background: rgb(42,42,42);
    background: linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(39, 39, 39) 100%);
    border-radius: 0 0 0.5vw 0.5vw;
}
.FilmMiniBottomDivTitleDivClass{
    /* background-color: red; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.FilmMiniBottomDivTitleClass{
    color: var(--light-font-color);
    font-size: 18px;
    opacity: 0.8;
    margin: 0 0.5vw 0 0.5vw;
    overflow: hidden;
    height: 70px;
}

/* bottom div bottom */
.FilmMiniBottomDivBottomClass{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* background-color: blue; */
}
.FilmMiniFavoriteButtonClass{
    border: none;
    background-color: transparent;
    height: 20px;
    cursor: pointer;
}
.FilmMiniFavoriteButtonClass img{
    height: 100%;
}
.FilmMiniRatingDivClass{
    font-size: calc(14px + 0.6vw);
    border-radius: 5px;
    width: calc(30px + 1.6vw);
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222222;
}
.FilmMiniDateDivClass{
    font-size: 20px;
    color: rgb(190, 190, 190);
}
</style>