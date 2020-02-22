<template>
    <div>
        <div class="search">
            <input placeholder="Поиск по товарам" class="search-bar" type="text">
        </div>
        
        <div class="goods">
            <div :key="idx" v-for="(item, idx) in goods" class="goods-item">
                <div class="goods-item-img">
                    <img :src="item.img">
                </div>
                <div class="goods-item-name">
                    {{item.name}}
                </div>
                <div class="goods-item-price">
                    {{item.price}}Р
                </div>
                <div class="goods-item-add">
                    <button>Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {db} from "../db"
export default {
    data() {
        return {
            goods: null
        }
    },
    methods: {
        print() {
            // eslint-disable-next-line no-console
            console.log(this.goods)
        }
    },
    firestore() {
        return {
			goods: db.collection('gds')
		}
    }
} 
</script>

<style lang="sass" scoped>
@import "@/sass/_variables"
.search

    &-bar
        width: 400px
        height: 40px
        font-size: 18px
        outline: none
        border: none
        border-radius: 50px
        background: #ccc
        text-align: center

.goods
    margin-top: 50px
    &-item
        display: grid
        grid-template-columns: 400px 1fr 1fr 1fr
        width: 90%
        background: #ccc
        border-radius: 25px
        margin: 0 auto
        margin-bottom: 10px
        align-items: center
        &-img
            width: 50px
            height: 50px
            img
                width: 100%
                height: 100%
                border-radius: 25px 0 0 25px
        &-add
            button
                background: #27ae60
                color: black
                width: 100px
                height: 35px
                border: none
                outline: none
                border-radius: 25px
                transition: .2s all
                cursor: pointer
                font-size: 18px
                &:hover
                    background: #2ecc71

    
</style>