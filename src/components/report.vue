<template>

<div class="wrapperreport">
        <v-container fluid class="container" >
            <v-row align="center" class="container-margin">
                <v-col md="2">
                    <v-row justify="center">
                        <div>
                            Имя продавца 
                        </div>
                    </v-row>
                    
                </v-col>
                <v-col md="2">    
                    <v-row justify="center">
                        <div>
                            Сумма продажи
                        </div>
                    </v-row>
                </v-col>
                <v-col md="2">
                   <v-row justify="center">
                        <div>
                            Полученная сумма
                        </div>
                    </v-row>
                </v-col>
                <v-col md="2">
                    <v-row justify="center">
                        <div>
                            Выданная сдача
                        </div>
                    </v-row>
                </v-col>
                <v-col md="1">
                    <v-row justify="end">
                        <div>
                            Дата
                        </div>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row justify="end">
                        <v-btn @click="openSorting()" x-large style="color: white" rounded color="#3498db"><v-icon left>mdi-cached</v-icon>Сортировка</v-btn>
                    </v-row>
                </v-col>
            </v-row>   
        </v-container>

    
                
        
        <v-expansion-panels  flat hover focusable multiple>
            <v-expansion-panel  class="panel open elevation-0" v-for="(item,i) in sales" :key="i">
                <v-expansion-panel-header>
                    <v-container>
                        <v-row>
                            <v-col md="2">
                                <v-row justify="center">
                                    <div>
                                        {{item.seller.name}}
                                    </div>
                                </v-row>
                            </v-col>
                            <v-col md="2">
                                <v-row justify="center">
                                    <div>
                                        {{item.sum}}
                                    </div>
                                </v-row>
                            </v-col>
                            <v-col md="2">
                                <v-row justify="center">
                                    <div>
                                        {{item.income}}
                                    </div>
                                </v-row>
                            </v-col>
                            <v-col md="2">
                                <v-row justify="center">
                                    <div>
                                        {{item.change}}
                                    </div>
                                </v-row>
                            </v-col>
                            <v-col md="2">
                                <v-row justify="center">
                                    <div>
                                        {{timeStamp(item.time.seconds)}}
                                    </div>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-container fluid>
                        <v-row>
                            <v-col auto>
                                Название товара
                            </v-col>
                            <v-col auto>
                                Цена товара
                            </v-col>
                            <v-col auto>
                                Количество товара
                            </v-col>
                        </v-row>
                        <v-divider/>
                    </v-container>
                    <v-container :key="index" v-for="(items, index) in item.items" fluid>
                        <v-row>
                            <v-col auto>
                                <div >
                                    {{items.name}}
                                </div>
                            </v-col>
                            <v-col auto>
                                <div>
                                    {{items.price}}
                                </div>
                            </v-col>
                            <v-col auto>
                                <div>
                                    {{items.value}}
                                </div>
                            </v-col>
                         </v-row>
                         <v-divider/>
                    </v-container>
                        
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        
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
    z-index: 555


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

.panel
    margin-top: 15px
    font-size: 20px
    font-weight: 500

.open
    border: 2px $border-color solid
    border-radius: 50px !important

.container-margin
    font-weight: 500
    font-size: 20px

.sorting-menu


</style>
