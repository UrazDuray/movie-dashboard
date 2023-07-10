<script>
    export default {
        props:{
            maxPageCount: Number
        },
        data() {
            return {
                pageClient: 1,
                realPage: 1,
                wrongPageInput: false
            }
        },
        methods: {
            PageUpdate(mode, value){
                if(mode == "increment"){
                    if(value > 0 && this.pageClient < this.maxPageCount){
                        this.pageClient++
                        this.realPage++
                    }
                    else if(value < 0 && this.pageClient != 1){
                        this.pageClient--
                        this.realPage--
                    }
                } 
                else if(mode == "set"){
                    this.pageClient = value
                    value = parseInt(value)
                    if(isNaN(value) || value <= 0 || value > this.maxPageCount){
                        this.wrongPageInput = true
                        return 
                    }
                    this.realPage = value
                }
                this.wrongPageInput = false
            },
            OverridePage(page){
                this.pageClient = this.realPage = page
            }
        },
        watch:{
            realPage: {
                handler: function(){
                    this.$emit('pageUpdate', this.realPage)
                }
            }
        }
    }
</script>

<template>
    <div :class="'PageNavigationDivClass'">
        <span :style="{textAlign: 'end'}" :class="'PageSideNumbersClass'">1</span>
        <button @click="PageUpdate('increment', -1)" :class="'PageNavigationButtonClass'"><img src="../icons/navigationArrowIcon.png" alt=""></button>
        <input :style="wrongPageInput ? {color: 'red'} : null" @input="PageUpdate('set', $event.target.value)" :value="pageClient" :class="'PageNavigationInputClass'" type="text">
        <button @click="PageUpdate('increment', 1)" :class="'PageNavigationButtonClass'"><img src="../icons/navigationArrowIcon.png" :style="{transform: 'rotate(180deg)'}" alt=""></button>
        <span :style="{textAlign: 'start'}" :class="'PageSideNumbersClass'">{{ maxPageCount }}</span>
    </div>
</template>

<style>
.PageNavigationDivClass{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 10px 0;
}
.PageNavigationInputClass{
    border: none;
    outline: none;
    background-color: #393939;
    color: var(--light-font-color);
    font-size: 22px;
    padding: 0.5vh 1vw 0.5vh 1vw;
    border-radius: 6px;
    width: 106px;
    text-align: center;
}
.PageNavigationButtonClass{
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
    transition-duration: 150ms;
}
.PageNavigationButtonClass img {    
    height: 24px;
    margin: 0 10px 0 10px;
}
.PageNavigationButtonClass:hover{
    opacity: 0.5;
}
.PageSideNumbersClass{
    font-size: 18px;
    width: 30px;
}

</style>