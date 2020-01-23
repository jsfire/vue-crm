<template>
    <div class='menu'>
        <fastMarket v-if='firstButton'/>
        <report v-if='secondButton'/>
    </div>
</template>

<script>
import { eventBus } from "../main";
import fastMarket from '@/components/fastMarket'
import report from '@/components/report'
export default {
    name: 'menuSelection',
    components: {
        fastMarket, report
    },
    data() {
        return {
            firstButton: true,
            secondButton: false,
            thirdButton: false,
            fourthButton: false,

        }
    },
    created() {
        // eslint-disable-next-line no-console
        eventBus.$on('clicksss', data => {
            this.firstButton = data.firstButton,
            this.secondButton = data.secondButton,
            this.thirdButton = data.thirdButton,
            this.fourthButton = data.fourthButton
        })
    }
}
</script>

<style lang="sass" scoped>
.menu
    width: 1620px
    height: 550px
    border: 2px #9969ff solid
    border-radius: 5px
    margin: 0 auto
    margin-top: 30px
    overflow: auto
    position: relative


.menu::-webkit-scrollbar 
    display: block
    width: 10px
    



/* Track */
.menu::-webkit-scrollbar-track 
    background: #f2f2f2
    


/* Handle */
.menu::-webkit-scrollbar-thumb 
    background: #888
    border-radius: 20px
    


/* Handle on hover */
.menu::-webkit-scrollbar-thumb:hover 
    background: #555
    height: 8px

</style>