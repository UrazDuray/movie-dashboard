<script>
    export default {
        props: {
            buttonRoute: String
        },
        computed: {

        },
        methods: {
            ButtonOnClick(){
                if(this.$route.path == this.buttonRoute){
                    this.$router.go()
                }
                else{
                    this.$router.push(this.buttonRoute)
                }                
            }  
        },

    }
</script>

<template>
    <button @click="ButtonOnClick" :class="'HeaderButtonClass'">
        <slot></slot>
    </button>
</template>

<style scoped>
.HeaderButtonClass{
    border: none;
    background-color: transparent;
    color: var(--light-font-color);
    font-size: 20px;
    margin-left: 3vw;
    cursor: pointer;
    transition-duration: 200ms;
}
.MainClass:hover{
    opacity: 0.8;
}

@media screen and (max-width: 600px) {
    .HeaderButtonClass{
        font-size: 14px;
    }
}
</style>