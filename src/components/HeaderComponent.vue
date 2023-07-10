<script setup>
    import HeaderButton from './HeaderButton.vue';

</script>

<script>
export default {
    props: {
        loading: false
    }

}
</script>


<template>
    <div :class="'HeaderMainClass'">
        <div :class="'GridArea1'">
            <img :style="{height: '30px'}" src="../icons/logoIcon.png" alt="">
            <HeaderButton :buttonRoute="'/'">Home</HeaderButton>
            <HeaderButton :buttonRoute="'/favorites'">Favorites</HeaderButton>
        </div>
        <div :class="['PageProgressBarClass', (this.loading ? 'PageProgressBarClassLoadingAnimClass' : 'PageProgressBarClassLoadedAnimClass') ]">No connection</div>
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
    padding-left: 30px;
}
.GridArea2{
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 20px;
}
.PageProgressBarClass{
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    height: 4px;
    border-radius: 0 2px 2px 0;
    opacity: 1;
    text-align: center;
    font-size: 0;
}
.PageProgressBarClassLoadingAnimClass{
    animation: 12s PageProgressBarClassLoadingAnim forwards ease-out;
}
.PageProgressBarClassLoadedAnimClass{
    animation: 1s PageProgressBarClassLoadedAnim forwards;
}
@keyframes PageProgressBarClassLoadingAnim{
    0% {
        width: 0%;
        background-color: rgb(59, 130, 197);
        opacity: 1;
        height: 4px;
        font-size: 0;
    }
    5%{
        width: 40%;
        background-color: rgb(59, 130, 197);
        opacity: 1;
    }
    70%{
        width: 60%;
        background-color: rgb(59, 130, 197);
        opacity: 1;
    }
    75%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 1;
    }
    80%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 0.2;
    }
    85%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 1;
    }
    90%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 0.2;
    }
    95%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 1;
        height: 4px;
        font-size: 0;
    }
    100%{
        width: 100%;
        background-color: rgb(197, 59, 59);
        height: 12px;
        font-size: 8px;
    }
}
@keyframes PageProgressBarClassLoadedAnim{
    0% {
        opacity: 1;
        width: 30%;
        background-color: rgb(59, 197, 105);
        height: 4px;
        font-size: 0;
    }
    80%{
        width: 100%;
        opacity: 1;
    }
    100%{
        width: 100%;
        background-color: rgb(59, 197, 105);
        opacity: 0;
        height: 4px;
        font-size: 0;
    }
}
</style>