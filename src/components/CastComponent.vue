<script>
    export default {
        props: {
            id: Number,
            department: String,
            imagePath: String,
            originalName: String,
        },
        computed: {
            departmentColor(){
                switch (this.department) {
                    case 'Acting':
                        return 'lightblue'
                    case 'Crew':
                        return 'lightsalmon'
                    case 'Production':
                        return 'lightgreen'
                    case 'Directing':
                        return 'lightpink'
                    default:
                        return "darkgrey"
                }
                
            }
        },
    }
</script>

<template>
    <div :class="'ActorComponentMainClass'">
        <div :class="'TopDiv'"><img v-if="imagePath" draggable="false" :src="'https://image.tmdb.org/t/p/w500/' + imagePath" alt="Porfile image unavailable"></div>
        <div :class="'BottomDiv'">
            <span :class="'OriginalNameSpan'">{{ originalName }}</span>
            <span :style="{color: departmentColor}" :class="'DepartmentNameSpan'">{{ department }}</span>
        </div>
    </div>
</template>

<style scoped>
.ActorComponentMainClass{
    display: flex;
    flex-wrap: wrap;
    width: 160px;
    min-width: 160px;
    margin: 1vh 1vw 1vh 1vw;
    cursor: pointer;
    border-radius: 0.8vw;
    box-shadow: 8px 8px 26px 0px rgb(9, 9, 9);
}
.TopDiv{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 0.8vw 0.8vw 0vw 0vw;
    
}
.TopDiv img{
    flex-shrink: 1;
    min-width: 100%;
    min-height: 100%;
    user-select: none;
}
.BottomDiv{
    width: 100%;
    height: 80px;
    border-radius: 0vw 0vw 0.8vw 0.8vw;
    background-color: #191a1b;
    padding: 4px 12px 4px 12px;
}
.OriginalNameSpan{
    font-size: 16px;
    display: block;
    color: lightgrey;
}
.DepartmentNameSpan{
    font-size: 13px;
    display: block;
}
</style>