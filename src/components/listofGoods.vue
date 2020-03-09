<template>
    <div class='menuSele'>

    <div class="card" :key="idx" v-for="(good, idx) of goods" >
    <v-hover v-slot:default="{ hover }"
        close-delay="200"> 
            <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto card-item"
            max-width="344"
            >
            <div class="card-item-image">
                <img :src="good.img">
            </div>
            
            <p class="descr-name">{{good.name | capitalize}}</p>
            <div class="description">
            <v-container class="column-height">
                <v-row>
                    <v-col class="column-height" col="2">
                        <v-spacer></v-spacer>
                    </v-col>
                    <v-col class="column-height" col="4">
                        <p class="description-price">{{good.price}}₽</p>
                    </v-col>
                    <v-col class="column-height" col="4">
                        <p class="description-price">{{good.remain}}шт.</p>
                    </v-col>
                    <v-col class="column-height" col="2">
                        <v-spacer></v-spacer>
                    </v-col>
                </v-row>
                
            </v-container>    
                
                
            </div>
            <v-container>
                <v-row>
                    <v-col class="column-height" col="1">
                        <v-spacer></v-spacer>
                    </v-col>
                    <v-col class="column-height" col="1">
                        <v-row justify="center">
                            <v-btn @click="deleteValue(good)" color="#3498db" outlined x-small fab><v-icon>mdi-minus</v-icon></v-btn>
                        </v-row>
                    </v-col>
                    <v-col class="column-height" col="8">
                        <v-row justify="center">
                            <div class="amount">{{good.amount}} шт.</div>
                        </v-row>
                    </v-col>
                    <v-col class="column-height" col="1">
                        <v-row justify="center">
                            <v-btn color="#3498db" @click="addValue(good)" outlined x-small fab><v-icon>mdi-plus</v-icon></v-btn>
                        </v-row>
                    </v-col>
                    <v-col class="column-height" col="1">
                        <v-spacer></v-spacer>
                    </v-col>
                </v-row>
               
            </v-container>
            <v-btn
            rounded
            v-on="on"
            class="buttonPr"
            medium
            color="#3498db"
            @click="addToCart(good)"
            >
            Добавить
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
                amount: obj.amount,
                remain: obj.remain
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
            obj.amount = 1
        },
        addValue(obj) {
            obj.amount++
            if (obj.amount > obj.remain) {
                obj.amount = obj.remain
            }
        },
        deleteValue(obj) {
            obj.amount--
            if (obj.amount < 1) {
                obj.amount = 1
            }
        },
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
                color: white
.descr        
    &-name
        font-weight: 500
.description
    &-price
        font-weight: 600

.amount
    width: 76px
    height: 31px
    border: 1px solid #3498DB
    padding: 2px
    border-radius: 31px
.column-height
    height: 70px

</style>