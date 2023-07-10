<script setup>
    import BlockTextComponent from "../components/BlockTextComponent.vue"
</script>

<script>
    export default {
        props:{
            title: String,
            color: String,
            value: String
        }   
    }
</script>

<template>
    <div :class="'NameAndValueComponentMainClass'">
        <span :class="'NameAndValueComponentTitleClass'">{{this.title}}:</span>
        <div>
            <BlockTextComponent :backgroundColor="this.color">{{this.value}}</BlockTextComponent>
        </div>
    </div>
</template>

<style>

.NameAndValueComponentMainClass{
    display: flex;
    flex-wrap: wrap;
    padding: 0 2vw 0 2vw;
    margin-bottom: 2vh;
}
.NameAndValueComponentTitleClass{
    font-size: calc(12px + 1vw);
    color: rgb(218, 218, 218);
    width: 8vw;
}
</style>