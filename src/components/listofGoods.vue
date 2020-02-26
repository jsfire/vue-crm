<template>
    <div class='menuSele'>

    <div class="card" :key="idx" v-for="(good, idx) of goods" >
    <v-hover v-slot:default="{ hover }"
        close-delay="200"> 
            <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto card-item"
            max-width="344"
            outlined>
            <div class="card-item-image">
                <img :src="good.img">
            </div>
            
            <p>{{good.name | capitalize}}</p>
            <p>{{good.price}}₽</p>
            <v-btn
            dark
            rounded
            v-on="on"
            class="buttonPr"
            medium
            outlined
            color="#3498db"
            @click="addToCart(good)"
            >
            Продать
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            </v-card>
        </v-hover>
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
            cart: [],
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
    grid-template-columns: 1fr 1fr 1fr 1fr
    .card
        margin-top: 15px
        &-item
            padding: 0 0 10px 0
            &-image
                width: 100%
                height: 200px
                background: white
                img
                    width: 100%
                    height: 100%
            .buttonPr
                color: black
                


</style>