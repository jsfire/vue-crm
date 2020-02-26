<template>
    <div>
        <v-overlay opacity="0.9" z-index="500" :value="clicked">
            <div class='cart_form'>
                <div class="cart_form_descr">Вы добавили: </div>
                <div class="cart_form_items">
                    <div :key='idx' v-for='(goods, idx) in cart' class="cart_form_items_item">
                        <img :src="goods.img" alt="">
                        <div class="name">{{goods.name | capitalize}}</div>
                        <div  class="price"><input class='value' v-bind:value="goods.price * goods.value + '₽'" disabled></div>
                        <div class="amount">
                            <button @click='addValue(goods)'>+</button>
                            <input type='number' v-model.Number='goods.value' @keypress='check(goods, $event)' class="amount">
                            <button @click='deleteValue(goods)'>-</button>
                        </div>
                        <button @click='deleteFromCart(goods)'>X</button>
                        
                    </div>
                    
                </div>
                <div class="cart_form_btns">
                    <button @click='pay_form_check = !pay_form_check, income = null, change = null' class='cart_form_btns_cash' >Оплата</button>
                    <div class="div">Сумма: {{ sumCart() }}₽</div>
                    <button @click='clearCart()'>Очистить  корзину</button>
                </div>
                
                <div v-if='pay_form_check' class='pay_form'>
                    <div class='sum'>Сумма к оплате: {{sum}}</div>
                    <div class='pay_form_select'>Выберите способ оплаты: </div>
                        <select>
                            <option>Наличные</option>
                        </select>
                    <input type='number' v-model='income' @change="findChange()" placeholder='Внесено ₽'>
                    <div class='pay_form_need'>Сдача: {{change}}  </div>
                    <button @click='transaction()'>Успешная оплата</button>
                    <button @click='pay_form_check = !pay_form_check, income = null, change = null'>Отклонить оплату</button>
                </div>

                <div v-if='transactionSucces' class='success'><p>Успешная оплата</p></div>
            </div>
        </v-overlay>
    </div>
</template>

<script>
import {eventBus} from '../main'
import {db} from '../db'
export default {
    name: 'cart',  
    data() {
        return {
            cart: [],
            sum: 0,
            value: 1,
            income: 0,
            change: null,
            pay_form_check: false,
            transactionSucces: false,
            username: [],
            overlay: false,
        }
    },
    props: ["clicked"],
    created() {
        eventBus.$on('transfer-cart', data => {
            this.cart = data.cart
            // eslint-disable-next-line no-console
            console.log("Added")
            })
        eventBus.$on('username', data => {
            this.username = data.user
            // eslint-disable-next-line no-console
            console.log(this.username)
        })
    },
    filters: {
        capitalize: (value) => {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    methods: {
        deleteFromCart(obj) {
            let index = this.cart.indexOf(obj)
            this.sum = this.sum - this.cart[index].price * this.cart[index].value
            this.cart.splice(index, 1)
            eventBus.$emit('transfer-cart', {
                cart: this.cart
            })
        },
        addValue(obj) {
            obj.value++
            eventBus.$emit('transfer-cart', {
                cart: this.cart
            })
        },
        deleteValue(obj) {
            obj.value--
            if (obj.value < 1) {
                obj.value = 1
            }
            eventBus.$emit('transfer-cart', {
                cart: this.cart
            })
        },

        clearCart() {
            this.cart = []
            this.sum = 0
            eventBus.$emit('clearCart', {
                cart: []
            })
            eventBus.$emit('transfer-cart', {
                cart: this.cart
            })
        },
        sumCart() {
            let items = []
            let result = 0;
            if (this.cart > []) {
                for (let item of this.cart) {
                    items.push(item.price * item.value)
                    // eslint-disable-next-line no-unused-vars
                    result = items.reduce((sum, current) => {
                        this.sum = sum + current
                        return(sum + current)
                    }, 0)
                }
                // eslint-disable-next-line no-console
                return result
            } 
            
        },
        check() {
            // eslint-disable-next-line no-console
            console.log(this.cart)
        },
        transaction() {
            let date = new Date()
            let year = date.getFullYear() 
            let month = date.getMonth() + 1
            let day = date.getDate()
            if (this.change == 'Невозможно провести транзакцию, внесенная сумма неверна') {
                this.change = null
            }
            if (this.change != null && this.income >= this.sum) {
                db.collection('sales').add({
                items: this.cart,
                sum: this.sum,
                income: this.income,
                time: new Date(),
                timeDay: {
                    day: day,
                    month: month,
                    year: year
                },
                change: this.change,
                seller: {
                    id: this.username.id,
                    name: this.username.name
                }
                    
                })
                this.clearCart();
                this.pay_form_check = false
                this.transactionSucces = true
                setTimeout(() => {this.transactionSucces = false}, 1000)
            }
            if (this.change == null || this.income < this.sum || this.change) {
                this.change = 'Невозможно провести транзакцию, внесенная сумма неверна'
            }
            
            
        },
        findChange() {
            if (this.income < this.sum) {
                this.change = 'Внесенная сумма меньше суммы товаров'
            }
            if (this.income == this.sum) {
               this.change = 'Сдача не требуется'
            }
            if (this.income > this.sum) {
                this.change = this.income - this.sum
            }
        }
        
    },
    computed: {
        total() {
            return this.cart.reduce(function (sum, item) {
            return sum + parseInt(item.TOTAL)
            }, 0)
        },
        find() {
            return this.findChange();

        }

    }
}

</script>

<style lang="sass" scoped>
@import "@/sass/_variables"
@keyframes successAnim
    from
        background: #fff
    50%
        background: #72db5a
        color: white
    to 
        background: #fff
.success
    width: 300px
    height: 150px
    text-align: center
    position: fixed
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    border: 1px solid $border-color
    border-radius: 25px
    background: #fff
    animation: successAnim 3s infinite
    p 
        margin-top: 70px


.pay_form
    width: 500px
    height: 400px
    position: fixed
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    border: 1px solid $border-color
    border-radius: 15px
    background: #fff
    display: grid
    grid-template-rows: 60px 60px 60px 60px
    justify-items: center
    z-index: 600
    color: black
    text-align: center
    .sum
        margin-top: 25px
    &_select
        margin-bottom: 15px
    input::-webkit-outer-spin-button
    input::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0
    select
        width: 150px
        height: 30px
        border-radius: 8px
        outline: none
        border: 1px solid $border-color
    input
        width: 150px
        height: 25px
        border: 1px solid $border-color
        border-radius: 8px
        outline: none
        text-align: center
    button
        width: 130px
        height: 30px
        margin: 5px
        border: 1px solid $border-color
        background: #fff
        border-radius: 8px
        outline: none
        cursor: pointer
        transition: 0.2s all ease
        font-size: 12px
        color: black
        &:hover
            background: $border-color
        &:active
            background: green
            color: white
        &:last-child
            &:hover
                background: $border-color
            &:active
                background: darkred
                color: white
                
       

.cart_form
    height: 500px
    width: 1000px
    background: #fff
    position: fixed
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    border: 1px solid $border-color
    border-radius: 15px
    box-shadow: 0 0 30px rgba(0,0,0,0.5)
    z-index: 600
    padding: 10px 0 10px 0
    color: black
    text-align: center
    &_descr
        text-align: center
        font-size: 18px
        z-index: 600
    &_btns
        display: flex
        justify-content: space-around
        margin-top: 15px
        button
            width: 150px
            height: 40px
            border: 1px solid $border-color
            border-radius: 25px
            outline: none
            cursor: pointer
            background: #fff
            transition: 0.3s all ease
            font-size: 15px
            color: black
            
            &:hover
                background: $border-color
                color: white
            &:active
                transition: none
                background: $border-color
                color: black

    &_items
        margin-top: 30px
        width: 100%
        height: 370px
        background: #fff
        overflow-y: auto
        overflow-x: hidden
        display: grid
        grid-template-columns: 1fr
        justify-items: center
        position: relative
        &_total
            border-radius: 15px
            width: 950px
            border: 1px solid $border-color
            height: 0%
            position: sticky
            background: #fff
            bottom: 0
            transition: 0.5s all ease
            font-size: 0
            padding-top: 15px
            &:hover
                height: 40px
                font-size: 20px
        &_item
            display: flex
            justify-content: space-around
            align-items: center
            color: black
            width: 950px
            height: 50px
            border: 1px solid $border-color
            border-radius: 15px
            margin-top: 10px
            background: #fff
            &_price
                .value
                    border: none
                    background: #fff
                    font-size: 18px
                    width: 50px
            img
                width: 50px
                height: 50px
            input
                width: 55px
                height: 45px
                text-align: center
                outline: none
                border: 1px solid $border-color
                border-radius: 25%
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button 
                    -webkit-appearance: none
                    margin: 0
            button
                width: 30px
                height: 30px
                margin: 5px
                border: 1px solid $border-color
                background: #fff
                border-radius: 25%
                outline: none
                cursor: pointer
                transition: 0.2s all ease
                font-size: 12px
                &:hover
                    background: $border-color
                &:active
                    background: $border-color
</style>