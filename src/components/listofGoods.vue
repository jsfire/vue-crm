<template>
    <div class='menuSele'>
        <div :key='idx' v-for='(good, idx) in goods' class='item'>
            <img :src="good.img" alt="">
            <div class="item_name">
                {{ good.name | capitalize }}
            </div>
            <div class="item_price"> Цена: {{good.price}}₽</div>
            <button class='item_sell' @click='addToCart(good)'>Продать</button>
        </div>
    </div>
</template>

<script>
import { db } from '../db'
import {eventBus} from '../main'
export default {
    name: 'item',
    components: {

    },
    data() {
        return {
            goods: [],
            cart: []
        }
    },
    filters: {
        capitalize: (value) => {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    firestore() {
        return {
			goods: db.collection('gds')
		}
    },
    created() {
        eventBus.$on('clearCart', data => {
            this.cart = data.cart
        })
    },
    methods: {
        addToCart(obj) {
            this.cart.push({
                name: obj.name,
                price: obj.price,
                img: obj.img,
                value: 1
            })
            for (let i = 0; i < this.cart.length - 1; i++) {
                if (this.cart[i+1].name == this.cart[i].name) {
                    // eslint-disable-next-line no-console
                    this.cart[i].value++
                    this.cart.splice(i+1,1)
                }
            }
            eventBus.$emit('transfer-cart', {
                cart: this.cart
            })
        }
    }
    
}
</script>

<style lang="sass" scoped>
@import "@/sass/_variables"
.menuSele
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .item
        width: 180px
        height: 220px
        background-color: #bdbdbd
        margin: 15px
        justify-self: center
        transition: 0.5s all ease-in
        padding: 15px 0 5px 0
        color: white
        border-radius: 25px
        position: relative
        border: 2px $border-color solid
        &:hover
            background: #72db5a
        img
            display: block
            height: 120px
            width: 120px
            border-radius: 25px
            margin: 0 auto
            margin-bottom: 25px
        &_name
            text-align: center
        &_price
            display: block
            margin-bottom: 10px
        &_sell
            width: 100px
            height: 40px
            background: #fff
            outline: none
            border: 2px solid $border-color
            border-radius: 25px
            transition: 0.3s all ease-in
            font-size: 16px
            cursor: pointer
            color: black
            &:hover
                background: $border-color
                color: white
</style>