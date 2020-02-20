<template>
    <div>
        <div class="cart" @click='cartPressed = !cartPressed'>
            <img :src='cartimage'  alt="">
        </div>
        <cart :class="{hidden: !cartPressed}"/>
        <div class='nom'>
            <item class='line-break'/>
        </div>
    </div>
</template>

<script>
import {eventBus} from '../main'
import item from '@/components/listofGoods';
import cart from '@/components/cart'
export default {
    name: 'fastMarket',
    components: {
        item, cart,
    },
    data() {
        return {
            cartimage: require("../assets/supermarket.svg"),
            cart: [],
            cartPressed: false
        }
    },
    created() {
        eventBus.$on('transfer-cart', data => {
            this.cart = data.cart.length
        })
    },
    methods: {
    }
}
</script>

<style lang="sass">
.nom
.cart
    width: 50px
    height: 50px
    position: absolute
    right: 10px
    top: 5px
    cursor: pointer
    z-index: 1000000
    img
        width: 100%
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
