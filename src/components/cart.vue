<template>
<div>
        <v-overlay opacity="0.9" z-index="500" :value="clicked">
            <v-container class="cart-wrapper" fluid>
                <v-row justify="end">
                    <v-btn x-large text color="#3498DB" @click="closecart()">Закрыть</v-btn>
                </v-row>
            <div class="items"> 
                <v-container :key='idx' v-for='(goods, idx) in cart' fluid text-xs-center>
                    <v-divider light/>
                    <v-row align="center"
                        justify="center"  class="cart_form_items_item">
                        <v-col auto>

                            <img class="image" :src="goods.img" alt="">

                        </v-col>
                        <v-col class="text" align-self="center" auto>
                            {{goods.name || capitalize}}
                        </v-col>
                        <v-col class="text" align-self="center" auto>
                             {{goods.price * goods.amount}}р.<v-icon small>mdi-currency-rub</v-icon>
                        </v-col>
                        <v-col align-self="center" auto>
                            <v-row justify="end">
                                <v-btn color="success" medium fab @click='addValue(goods)'><v-icon>mdi-plus</v-icon></v-btn>
                            </v-row>
                        </v-col>
                        <v-col class="text" align-self="center" auto>
                            <v-row justify="center">
                                <input
                                    class="amount"
                                    v-model="goods.amount"
                                    label="Количество"
                                    type="number">
                            </v-row> 
                        </v-col>
                        <v-col align-self="center" auto>
                            <v-row justify="start">
                                <v-btn  color="red" medium fab @click='deleteValue(goods)'><v-icon>mdi-minus</v-icon></v-btn>
                            </v-row>
                        </v-col>
                       <v-col align-self="center" auto>
                           <v-btn color="error" medium fab @click='deleteFromCart(goods)'><v-icon>mdi-close</v-icon></v-btn>
                       </v-col>
                    </v-row>
                    
                    <v-divider light/>  
                </v-container>
            </div>      
            <v-row align="center">
                <v-col auto>
                    <v-row justify="center">
                        <p>Сумма: </p><p class="sum">{{sumCart()}}р.</p>
                    </v-row>
                </v-col>
                <v-col auto>
                    <v-row justify="center">
                        <p style="margin: 0">Получено: </p><input v-model="income" @input="findChange()" placeholder="Введите кол-во" class="sum" type="number">
                    </v-row>
                </v-col>
                <v-col auto>
                    <v-row justify="center">
                        <p style="margin: 0">Сдача: </p><p class="sum">{{change}}р.</p>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider light></v-divider>
            <v-row>
                        <v-col col="9">
                            <v-spacer></v-spacer>
                        </v-col>
                        
                        <v-col cols="2">
                            <v-row justify="end">
                                <v-btn x-large text color="#F13333" @click='close()'>Отменить</v-btn>
                            </v-row>
                        </v-col>

                        <v-col cols="1" >
                            <v-row justify="center">
                                <v-btn x-large :loading="loader" light :disabled="declined" text color="#3498DB" @click='transaction()'>Оплата</v-btn>
                            </v-row>
                        </v-col>

                    </v-row>
            </v-container>                 
        
        <v-progress-circular
            width="15"
            class="loader"
            color="#3498DB"
            size="150"
            indeterminate
            v-if="loader"
            ></v-progress-circular>
        
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
            change: 0,
            pay_form_check: false,
            transactionSucces: false,
            username: [],
            overlay: false,
            loader: false,
            declined: false,
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
            console.log(this.username.id)
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
            obj.amount++
            if (obj.amount > obj.remain) {
                obj.amount = obj.remain
            }
            eventBus.$emit('transfer-cart', {
                cart: this.cart
            })
        },
        deleteValue(obj) {
            obj.amount--
            if (obj.amount < 1) {
                obj.amount = 1
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
        close() {
            this.clearCart()
            this.closecart()
        },
        sumCart() {
            let items = []
            let result = 0;
            if (this.cart > []) {
                for (let item of this.cart) {
                    items.push(item.price * item.amount)
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
            if (this.change == null || this.income < this.sum || this.change) {
                this.change = 'Невозможно провести транзакцию'
                this.declined = true
            }
            if (this.change != null && this.income >= this.sum) {
                this.loader = true
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
                    
                }).then(() => {
                    this.loader = false
                    this.clearCart();
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.error(err)
                    this.loader = false
                })
            }
            
            
            
        },
        findChange() {
            if (this.income < this.sum) {
                this.change = 'Внесенная сумма меньше суммы товаров'
                this.declined = true
            }
            if (this.income == this.sum) {
               this.change = 'Сдача не требуется'
               this.declined = false
            }
            if (this.income > this.sum) {
                this.change = this.income - this.sum
                this.declined = false
            }
        },
        closecart() {
            eventBus.$emit("opencart", {cartPressed: false})
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

        },


    }
}

</script>

<style lang="sass" scoped>
@import "@/sass/_variables"
.loader
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
*
    color: black

.items
    overflow: auto
    height: 575px
    width: 80vw

.cart-wrapper
    max-width: 1705px
    height: 775px
    background: white


.price
    height: 50px
.image
    background: white
    width: 100px
    height: 100px   
.item
    text-align: center
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
input
    text-align: center
    outline: none
.amount
    width: 50px
    height: 50px
.items::-webkit-scrollbar 
    display: block
    width: 10px
    

.text
    font-size: 20px
    font-weight: 500    

/* Track */
.items::-webkit-scrollbar-track 
    background: transparent
    


/* Handle */
.items::-webkit-scrollbar-thumb 
    background: black
    border-radius: 20px
    


/* Handle on hover */
.items::-webkit-scrollbar-thumb:hover 
    background: black
    height: 8px

.sum
    font-weight: 500


</style>