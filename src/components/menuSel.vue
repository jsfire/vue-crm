<template>
    <div class='menu'>
        <fastMarket v-if="firstButton"/>
        <report v-if='secondButton'/>
        <selling v-if="thirdButton"></selling>
        <cart :clicked="cartPressed"></cart>
        <orders v-if="fourthButton"/>
    </div>
</template>

<script>
import { eventBus } from "../main";
import fastMarket from '@/components/listofGoods'
import report from '@/components/report'
import selling from "@/components/selling"
import cart from "@/components/cart"
import orders from "@/components/orders"
export default {
    name: 'menuSelection',
    components: {
        fastMarket, report, selling, cart, orders
    },
    data() {
        return {
            firstButton: true,
            secondButton: false,
            thirdButton: false,
            fourthButton: false,
            cartPressed: false,

        }
    },
    created() {
        // eslint-disable-next-line no-console
        eventBus.$on('clicksss', data => {
            this.firstButton = data.firstButton,
            this.secondButton = data.secondButton,
            this.thirdButton = data.thirdButton,
            this.fourthButton = data.fourthButton
        }),
        eventBus.$on('opencart', data => {
            this.cartPressed = data.cartPressed
        })
    }
}
</script>

<style lang="sass" scoped>
@import "@/sass/_variables"
.menu
    width: 95%
    height: 90vh
    margin: 0 auto
    margin-top: 10px
    overflow: auto
    


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