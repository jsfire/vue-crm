<template>
    <div>
        <!-- <div :key='idx' v-for='(smth,idx) in cart'>I selected: {{smth.name}} {{smth.price}} </div> -->
        <div :key='idx' v-for='(good, idx) in goods[0]' class='item'>
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
export default {
    name: 'item',
    components: {

    },
    data() {
        return {
            goods: [],
            cart: [

            ]
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
			goods: db.collection('goods')
		}
    },
    methods: {
        addToCart(obj) {
            this.cart.push({
                name: obj.name,
                price: obj.price,
            })
        }
    }
    
}
</script>

<style lang="sass">
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
    border: 4px #9969ff solid
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
        border: 2px solid #9969ff
        border-radius: 25px
        transition: 0.3s all ease-in
        &:hover
            background: #9969ff
            color: white
</style>