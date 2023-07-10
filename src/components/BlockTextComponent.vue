<script>
    export default{
        props: {
            backgroundColor: String
        },
        mounted() {
            console.log(this.backgroundColor)
        },
    }
</script>

<template>
    <div :style="{backgroundColor: backgroundColor}" :class="'BlockTextComponentMainClass'">
        <slot></slot>
    </div>
</template>

<style>
.BlockTextComponentMainClass{
    padding: 0.5vh 1vw 0.5vh 1vw;
    border-radius: 8px;
    font-size: calc(8px + 1vw);
    color: #222222;
    width: fit-content;
    margin-left: calc(20px + 0.4vw);
}
</style>