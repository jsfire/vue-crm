<template>
    <div>
        <div v-if='gotData'>
        <div class='sales_report_info'>
                <button class='sales_report_item name'>
                    Имя продавца 
                </button>
                <button  class='sales_report_item id'>
                    ID продавца
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
                <a @click='sorting = !sorting' href='#'><i class="fas fa-sliders-h"></i></a>
        </div>
        <div :key='idx' v-for='(sale, idx) in sales'>
        <div class='sales_report'>
                <div class='sales_report_item name'>
                    {{sale.seller.name}}
                </div>
                <div class='sales_report_item id'>
                    {{sale.seller.id}}
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
    <loader v-if='!gotData' class='loader'/>
    <div :class='{activated: sorting, deactivated: !sorting}' class='sorting_menu'>
        <a @click='sorting = !sorting'><i class="fas fa-times"></i></a>
        <p>Сортировка по:</p>
        <div class='sort_by'>
            <button @click='
            onSum = false
            onIncome = false
            onChange = false
            onSum = true
            ' :class='{active: onSum}'>Сумме</button>
            <button @click='
            onSum = false
            onIncome = false
            onChange = false
            onIncome = true
            ' :class='{active: onIncome}'>Полученной сумме</button>
            <button @click='
            onSum = false
            onIncome = false
            onChange = false
            onChange = true
            ' :class='{active: onChange}'>Сдаче</button>
        </div>
        <div class='on_seller'>
            <div :key='idx' v-for='(seller, idx) in sellers'>
                <input checked type='checkbox'/> {{seller.name}}
            </div>
        </div>
        <div class='up_down'>
            <select v-model='selected'>
                <option>По возрастанию</option>
                <option>По убыванию</option>
            </select>
        </div>
        <div class='date_picker'>
            <p>С</p>
            <input :value="dateLow && dateLow.toISOString().split('T')[0]"
                   @input="dateLow = $event.target.valueAsDate" type='date'>
            <p>По</p>
            <input :value="dateHigh && dateHigh.toISOString().split('T')[0]"
                   @input="dateHigh = $event.target.valueAsDate" type='date'>
        </div>
        
        <button @click='sort()'>Сортировать</button>
    
    </div>
    </div>
</template>

<script>
import loader from '@/components/loader';
import {db} from '../db';
export default {
    components: {
        loader,
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
        }
    },
    methods: {
        timeStamp(time) {
           let date = new Date(time * 1000);

           return date
        },
        sortBySumOnLow() {
            this.sales.sort((a, b) => {
                return a.sum - b.sum
            })
        },
        sortBySumOnHigh() {
            this.sales.sort((a, b) => {
                return b.sum - a.sum
            })
        },
        dateforto() {
            for (let sale of this.sales) {
                let date = new Date(sale.time.seconds * 1000)

                if (date < this.dateLow) {
                    this.removed.push(sale)
                    this.sales = this.sales.filter(time => {
                        time.time.seconds * 1000 < date
                    })
                }
                if (date > this.dateHigh) {
                    this.removed.push(sale)
                    this.sales = this.sales.filter(time => {
                        time.time.seconds * 1000 > date
                    })
                }

            }
        },
        sortOnIncomeLow() {
            this.sales.sort((a, b) => {
            return a.income - b.income
            })
        },
        sortOnIncomeHigh() {
            this.sales.sort((a, b) => {
            return b.income - a.income
            })
        },
        sortOnChangeLow() {
            this.sales.sort((a, b) => {
            return a.change - b.change
            })
        },
        sortOnChangeHigh() {
            this.sales.sort((a, b) => {
            return b.change - a.change
            })
        },
        sort() {
            if (this.onSum == true) {
                if (this.selected == 'По возрастанию') {
                    this.sortBySumOnHigh()
                }
                if (this.selected == 'По убыванию') {
                    this.sortBySumOnLow()
                }
                else {
                    this.sortBySumOnHigh()
                }
            }
            if (this.onIncome == true) {
                if (this.selected == 'По возрастанию') {
                    this.sortOnIncomeHigh()
                }
                if (this.selected == 'По убыванию') {
                    this.sortOnIncomeLow()
                }
                else {
                    this.sortOnIncomeHigh()
                }
            }
            if (this.onChange == true) {
                if (this.selected == 'По возрастанию') {
                    this.sortOnChangeHigh()
                }
                if (this.selected == 'По убыванию') {
                    this.sortOnChangeLow()
                }
                else {
                    this.sortOnChangeHigh()
                }
            }
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
            sales: db.collection("sales").orderBy("time", "asc"),
            sellers: db.collection("users")
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




.sorting_menu
    height: 500px
    background: #fff
    width: 400px
    position: fixed
    right: -450px
    top: 170px
    border: 2px solid #9969ff
    border-radius: 50px  0  0 50px
    z-index: 10000
    a 
        width: 50px
        height: 50px
        font-size: 35px
        position: absolute
        left: 0
        top: 15px
        cursor: pointer
        transition: 0.3s all ease-in
        &:hover
            color: red
    p
        margin-top: 25px
    .sort_by
        display: flex
        justify-content: space-around
        margin-top: 10px
        button
            width: 100px
            height: 40px
            border-radius: 25px
            border: 2px solid #9969ff
            outline: none
            cursor: pointer
            color: black
            &:hover
                background: #9969ff
        

    .up_down
        margin-top: 20px
        select
            width: 150px
            height: 30px
            border: 2px solid #9969ff
            outline: none
            border-radius: 25px
    .date_picker
        margin-top: 40px
        input
            margin-top: 10px
            width: 150px
            height: 40px
            text-align: center
            border-radius: 25px
            border: 2px solid #9969ff
            outline: none
            &::-webkit-inner-spin-button 
                display: none
        p
            margin-top: 10px
    button
        width: 100px
        height: 40px
        border-radius: 25px
        border: 2px solid #9969ff
        background: #fff
        outline: none
        cursor: pointer
        margin-top: 30px
        transition: 0.3s all ease
        color: black
        &:hover
            background: #9969ff
    .active 
        background: #9969ff
.loader
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
.active
    background: #9969ff

.items
    width: 40%
    height: 40px
    display: grid
    margin: 0 auto
    border: 2px #9969ff solid
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
    border: 2px #9969ff solid
    border-radius: 50px
    align-items: center
    margin-top: 15px
    text-align: center
    grid-template-columns: 150px 200px 100px 100px 100px
    background-color: white
    z-index: 999
    
    &_info
        width: 99%
        height: 40px
        display: grid
        margin: 0 auto
        border-radius: 50px
        align-items: center
        margin-top: 15px
        text-align: center
        grid-template-columns: 150px 200px 100px 100px 100px 890px
        z-index: -1
        button
            width: 95%
            height: 40px
            border-radius: 50px
            border: 2px solid #9969ff
            background: #fff
            outline: none
            cursor: pointer
            z-index: 999
            transition: 0.3s all ease
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
