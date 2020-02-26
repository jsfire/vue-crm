<template>
    <div>
        <v-btn @click="backtomain()" class="back-to-main" color="error"><v-icon left x-large>mdi-arrow-left</v-icon>На главную</v-btn>
        <div class="search">
            <v-text-field v-model="search" prepend-inner-icon="mdi-card-search-outline" placeholder="Поиск" outlined raised filled width="100px"></v-text-field>
        </div>

        

        <div class="goods">
            <div :key="idx" v-for="(item, idx) in filteredList" class="goods-item">
                <div class="goods-item-img">
                    <img :src="item.img">
                </div>
                <div class="goods-item-name">
                    {{item.name}}
                </div>
                <div class="goods-item-price">
                    {{item.price}}₽
                </div>
                <div class="goods-item-add">
                    <v-btn @click="addToCart(item)" color="success">Добавить<v-icon medium>mdi-check</v-icon></v-btn>
                </div>
            </div>
        </div>
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
                value: 1
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
        }

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
    width: 500px
    margin: 0 auto
.goods
    margin-top: 50px
    &-item
        display: grid
        grid-template-columns: 1fr 1fr 1fr 1fr
        width: 90%
        background: white
        border-radius: 15px
        margin: 0 auto
        border: 1px solid #3498db
        margin-bottom: 10px
        align-items: center
        &-img
            width: 50px
            height: 50px
            margin-left: 25px
            background: white
            img
                width: 80%
                height: 100%
.cart
    position: absolute
    top: 10%
    right: 3%

.back-to-main
    position: absolute
    left: 20px
    top: 15% 
</style>