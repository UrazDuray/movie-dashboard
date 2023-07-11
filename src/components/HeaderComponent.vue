<script setup>
    import HeaderButton from './HeaderButton.vue';
    import LogoIcon from '../icons/logoIcon.png'

</script>

<script>
export default {
    props: {
        searchContent: String
    },
    data() {
        return {
            searching: false,
        }
    },
    methods: {
        EmitSearchContent(value){
            this.$emit('SearchContentUpdate', value)
        }
    },
}
</script>


<template>
    <div :class="'HeaderMainClass'">
        <div :class="'GridArea1'">
            <img :class="'LogoImgClass'" :src="LogoIcon" alt="">
            <HeaderButton :buttonRoute="'/'">Home</HeaderButton>
            <HeaderButton :buttonRoute="'/favorites'">Favorites</HeaderButton>
        </div>
        <div :class="'GridArea2'">
            <input @input="EmitSearchContent($event.target.value)" :value="searchContent" :placeholder="'Search'" :class="'SearchInputClass'" type="text">
        </div>
    </div>
    
</template>

<style scoped>
:root{
  --header-height: 60px;
}
.HeaderMainClass{
    background-color: rgb(46, 46, 46);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: var(--header-height);
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: var(--header-height);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}
.GridArea1{
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: start;
    align-items: center;
}
.GridArea2{
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 20px;
}
.LogoImgClass{
    height: 30px;
    margin-left: 30px;
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

@media screen and (max-width: 600px) {
    .LogoImgClass{
        height: 18px;
        margin-left: 20px;
    }
    .SearchInputClass{
        font-size: 18px;
    }
}
</style>