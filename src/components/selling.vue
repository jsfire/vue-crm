<template>
    <div>
        <div class="search">
            <v-container>
                <v-row>
                    <v-col auto>
                        <v-row justify="center">
                            <input v-model="search"  placeholder="Поиск" class="search-bar"><v-btn class="search-icon" large fab color="#3498db" dark><v-icon>mdi-magnify</v-icon></v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

        </div>
        <v-container class="goods">
            <v-container :key="idx" v-for="(item, idx) in filteredList" class="goods-item">
                <v-row align="center">
                    <v-col class="goods-item-cols" col="2">
                        <v-row align="center" justify="start">
                            <img class="goods-item-img" :src="item.img">
                        </v-row>
                    </v-col>
                    <v-col class="goods-item-cols" col="2">
                        <v-row justify="start">
                            <v-col auto>
                                {{item.name}} 
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="goods-item-cols" col="1">
                         <v-row align="center" justify="start">
                            <v-col auto>
                                {{item.price}}₽
                            </v-col>
                            <v-col auto>
                                {{item.remain}}шт.
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="goods-item-cols" col="3">
                        <v-row justify="end">
                            <v-col auto>
                                <v-row justify="end">
                                  <v-btn @click="deleteValue(item)" color="#3498db" outlined x-small fab><v-icon>mdi-minus</v-icon></v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                     <v-col class="goods-item-cols" col="2">
                        <v-row justify="center">
                            <v-col auto>
                                <div class="amount">{{item.amount}} шт.</div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="goods-item-cols" col="1">
                        <v-row justify="start">
                            <v-col auto>
                                <v-row justify="start">
                                    <v-btn color="#3498db" @click="addValue(item)" outlined x-small fab><v-icon>mdi-plus</v-icon></v-btn>
                                </v-row>
                                
                            </v-col> 
                        </v-row>
                    </v-col>
                    <v-col class="goods-item-cols" col="1">
                        <v-row justify="end">
                            <v-btn style="width: 200px" @click="addToCart(item)" dark rounded x-large color="#3498db">Добавить<v-icon medium>mdi-check</v-icon></v-btn>
                        </v-row>
                    </v-col>                        
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>

<script>
import {db} from "../db"
import {eventBus} from "../main"
export default {
    components: {
    },
    data() {
        return {
            goods: [],
            cart: [],
            cartPressed: false,
            search: ""
        }
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
            // eslint-disable-next-line no-console
                console.log(this.cart)
                eventBus.$emit('transfer-cart', {
                    cart: this.cart
                })
            },
        backtomain() {
            eventBus.$emit('open-menu', {
                globalSelling: this.globalSelling
            })
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

        },
    firestore() {
        return {
			goods: db.collection('gds')
		}
    },
      computed: {
    filteredList() {
        return this.goods.filter(good => {
            return good.name.includes(this.search)
            })
        }
    }

} 
</script>

<style lang="sass" scoped>
@import "@/sass/_variables"
.search
    margin: 0 auto
    margin-top: 25px
    &-bar
        width: 480px
        height: 66px
        border: 3px solid #3498DB
        box-sizing: border-box
        border-radius: 69px
        text-align: start
        padding: 0 0 0 25px
        font-size: 18px
        outline: none
    &-icon
        margin-left: -60px
.goods
    &-item
        width: 90%
        background: white
        margin: 0 auto
        margin-bottom: 10px
        align-items: center
        &-cols
            height: 80px
            border-top: 3px solid #3498db
            border-bottom: 3px solid #3498db
            &:first-child
                border-left: 3px solid #3498db
                border-radius: 50px 0  0  50px
            &:last-child
                border: none
            &:nth-child(6)
                border-right: 3px solid #3498db
                border-radius:  0 50px 50px   0
            &:nth-child(3)
                font-weight: 500
            &:nth-child(5)
                font-weight: 500
            &:nth-child(2)
                font-weight: 500
        &-img
            width: 50px
            height: 50px
            margin-left: 25px
            background: white
.cart
    position: absolute
    top: 10%
    right: 3%
.back-to-main
    position: absolute
    left: 20px
    top: 15% 
img
    width: 80%
    height: 100%
</style>