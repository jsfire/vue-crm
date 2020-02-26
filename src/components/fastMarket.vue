<template>
    <div>
        <div class="cart" @click='cartPressed = !cartPressed'>
                    <v-badge
          color="deep-purple accent-4"
          :content="cart"
          
        >
        <v-icon class="cart-icon" size="50" color="black">mdi-cart-outline</v-icon>
        </v-badge>
            

        </div>
        <cart :clicked="cartPressed"/>
        <div class='nom'>
            <item v-if="!globalSelling" class='line-break'/>
            <selling v-if="globalSelling"/>
        </div>
    </div>
</template>

<script>
import {eventBus} from '../main'
import item from '@/components/listofGoods';
import cart from '@/components/cart'
import selling from '@/components/selling'
export default {
    name: 'fastMarket',
    components: {
         cart, selling, item
    },
    data() {
        return {
            cartimage: require("../assets/supermarket.svg"),
            cart: false,
            cartPressed: false,
            globalSelling: false
        }
    },
    created() {
        eventBus.$on('transfer-cart', data => {
            this.cart = data.cart.length
        }),
        eventBus.$on('open-menu', data => {
            this.globalSelling = data.globalSelling
        })
    },
    methods: {
    },

}
</script>

<style lang="sass">
@import "@/sass/_variables"
.nom
.cart
    width: 50px
    height: 50px
    position: absolute
    right: 2%
    top: 10%
    cursor: pointer
    z-index: 1000000
    &_orange
        height: 35%
        width: 35%
        background: orange
        border-radius: 100%
        position: absolute
        right: -10px
        top: 0
        color: black
        text-align: center
        font-size: 12px
        p
            margin-top: 2px

.hidden
    visibility: hidden

</style>
