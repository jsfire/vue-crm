<template>
    <div>
        <div v-if='gotData'>
        <div class='sales_report_info'>
                <button class='sales_report_item name'>
                    Имя продавца 
                </button>
                <button  class='sales_report_item sum'>
                    Сумма продажи
                </button>
                <button  class='sales_report_item income'>
                    Полученная сумма
                </button>
                <button  class='sales_report_item change'>
                    Выданная сдача
                </button>
                <button class='sales_report_item time'>
                    Дата 
                </button>
                
        </div>
        <v-icon class="open-menu" @click='openSorting()' color="black" x-large>mdi-menu</v-icon>
        <div :key='idx' v-for='(sale, idx) in sales'>
        <div class='sales_report'>
                <div class='sales_report_item name'>
                    {{sale.seller.name}}
                </div>
                <div class='sales_report_item sum'>
                    {{sale.sum}}₽
                </div>
                <div class='sales_report_item income'>
                    {{sale.income}}₽
                </div>
                <div class='sales_report_item change'>
                    {{sale.change}}₽
                </div>
                <div class='sales_report_item time'>
                    {{timeStamp(sale.time.seconds)}}
                </div>
            </div>
                <div class='items'>
                <div>Проданные товары:</div>
                <div :key='idx' v-for='(items, idx) in sale.items'>
                    
                    <div class='items_name'>
                        {{items.name | capitalize}}
                    </div>
                    <div class='items_price'>
                        {{items.price}}₽
                    </div>
                </div>
                </div>
        </div>
        </div>
    
        <sort/>

    </div>
</template>

<script>
import sort from "@/components/sortingmenu"
import { eventBus } from '../main';
import {db} from '../db'
export default {
    components: {
        sort,
    },
    data() {
        return {
            sales: {},
            name: false,
            id: false,
            income: false,
            sum: false,
            change: false,
            date: false,
            gotData: true,
            settings: require('../assets/Settings-07.svg'),
            sorting: false,
            onDate: null,
            toDate: null,
            onSum: true,
            onIncome: false,
            onChange: false,
            dateLow: null,
            dateHigh: null,
            selected: null,
            removed: [],
            sellers: [],
            overlay: false
        }
    },

    methods: {
        openSorting() {
            eventBus.$emit('sort-open', {
                overlay: !this.overlay
            })
            // eslint-disable-next-line no-console
            console.log(this.overlay)
        },
        timeStamp(time) {
           
           let date = new Date(time * 1000);
           let day = date.getDate()
           let month = date.getMonth() + 1
           let year = date.getFullYear()
           let hours = date.getHours()
           let minutes = date.getMinutes()

            
            
            
            


           return (`${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day} ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`)

        },
    },

    filters: {
        capitalize: (value) => {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    created() {
        eventBus.$on('sort-data', data => {
            this.sales = data.sales
        })
        eventBus.$on('sort-open', data => {
            this.overlay = data.overlay
        })
    },
    firestore() {
        return {
            sales: db.collection('sales')
        }
    }
    
}
</script>

<style lang='sass' scoped>
@import "@/sass/_variables"
@keyframes menuActive
    from
        right: -450px
    to
        right: -10px

@keyframes menuNot
    from
        right: -10px
    to
        right: -450px
.on_seller
    margin-top: 15px
.activated 
    animation: menuActive 0.5s ease-in
    animation-fill-mode: forwards
.deactivated
    animation: menuNot 0.5s ease-in
    animation-fill-mode: forwards

.open-menu
    position: absolute
    right: 5%
    top: 14%


.sorting_menu
    height: 500px
    background: #fff
    width: 400px
    position: fixed
    right: -450px
    top: 170px
    border: 1px solid $border-color
    border-radius: 15px  0  0 15px
    z-index: 10000
    a 
        width: 50px
        height: 50px
        font-size: 25px
        position: absolute
        left: 0
        cursor: pointer
        transition: 0.3s all ease-in
        &:hover
            color: red
    p
        margin: 0
    .sort_by
        display: flex
        justify-content: space-around

        button
            width: 120px
            height: 40px
            border-radius: 25px
            border: 1px solid $border-color
            outline: none
            cursor: pointer
            color: black
            font-size: 13px
            
            
            &:hover
                background: $border-color
        

    .up_down

        select
            width: 150px
            height: 30px
            border: 1px solid $border-color
            outline: none
            border-radius: 10px
            margin-top: 15px
    .date_picker

        input
            margin-top: 15px
            width: 150px
            height: 40px
            text-align: center
            border-radius: 15px
            border: 1px solid $border-color
            outline: none
            &::-webkit-inner-spin-button 
                display: none
        p
           margin: 0
    button
        width: 100px
        height: 40px
        border-radius: 15px
        border: 1px solid $border-color
        background: #fff
        outline: none
        cursor: pointer
        transition: 0.3s all ease
        color: black
        margin-top: 15px
        &:hover
            background: $border-color
    .active 
        background: $border-color
.loader
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
.active
    background: $border-color

.items
    width: 40%
    height: 40px
    display: grid
    margin: 0 auto
    border: 1px solid $border-color
    border-radius: 50px
    align-items: center
    margin-top: -45px
    text-align: center
    grid-template-columns: 250px 150px 150px
    background: #fff
    display: none
    &_name
        grid-row: 1
    &_price
        grid-row: 1
.sales_report
    width: 99%
    height: 40px
    display: grid
    margin: 0 auto
    border: 1px solid $border-color
    border-radius: 15px
    align-items: center
    margin-top: 15px
    text-align: center
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
    background-color: white
    z-index: 999
    
    &_info
        width: 99%
        height: 40px
        display: grid
        margin: 0 auto
        border-radius: 25px
        align-items: center
        margin-top: 15px
        text-align: center
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
        z-index: -1
        button
            width: 98%
            height: 40px
            border-radius: 15px
            border: 1px solid $border-color
            background: #fff
            outline: none
            cursor: pointer
            color: black
        a
            grid-row: 1
            width: 40px
            height: 40px
            font-size: 40px
            cursor: pointer
            z-index: 999
            text-decoration: none
            color: black
            transition: 0.3s all ease-in
            z-index: 10000
            &:hover
                color: #9969ff
            i 
    &_item
        grid-row: 1
    .sum .income .change
        text-align: end



</style>
