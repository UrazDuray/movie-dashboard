<script setup>
    import HeaderButton from './HeaderButton.vue';

</script>

<script>
export default {

}
</script>


<template>
    <div :class="'HeaderMainClass'">
        <div :class="'GridArea1'">
            <img :class="'LogoImgClass'" src="../icons/logoIcon.png" alt="">
            <HeaderButton :buttonRoute="'/'">Home</HeaderButton>
            <HeaderButton :buttonRoute="'/favorites'">Favorites</HeaderButton>
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

@media screen and (max-width: 600px) {
    .LogoImgClass{
        height: 20px;
        margin-left: 20px;
    }
}
</style>