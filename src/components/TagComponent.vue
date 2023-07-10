<script>

</script>

<template>
    <button :class="'TagComponentMainClass'">
        <slot></slot>
    </button>
</template>

<style scoped>
.TagComponentMainClass{
    border: none;
    background-color: #3EA7E3;
    border-radius: calc(4px + 0.2vw);
    color: #222222;
    font-size: 18px;
    
    padding: 4px 12px 4px 12px;
    cursor: pointer;
    margin: 4px;
}
</style>