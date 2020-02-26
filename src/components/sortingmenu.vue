<template> 
        <v-overlay :value="overlay" opacity="0.8">
                <v-select v-model="salesName" placeholder="Выберите продавца" label="Сортировка по продавцу" :items="users" item-text="name"></v-select>
            

            
            
            
            
            <v-radio-group row v-model="radios" :mandatory="false">
                        <v-radio color="#3498db" label="По сумме" value="1"/>
                        <v-radio color="#3498db" label="По полученной сумме" value="2"/>
                        <v-radio color="#3498db" label="По сдаче" value="3"/>
            </v-radio-group>
                
        
        
            <v-select color="#3498db"
                :items="items"
                v-model="selected"
                label="Возрастание/Убывание"
                ></v-select>
                
            
               
                    
            <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field color="#3498db"
              v-model="date1"
              label="С"
              hint="Дата в формате Год/Месяц/День"
              persistent-hint
              prepend-icon="mdi-event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker color="#3498db" v-model="date1" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>

            
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field color="#3498db"
              v-model="date2"
              label="По"
              hint="Дата в формате Год/Месяц/День"
              persistent-hint
              prepend-icon="mdi-event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker color="#3498db" v-model="date2" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
        

        <v-btn @click="sort()" class="buttons" large color="#3498db">Сортировать</v-btn>

        <v-btn @click="revert()" large color="error" class="buttons">Вернуть начальное <br> состояние</v-btn>

        <v-btn @click="back()" large color="error" class="buttons">Назад</v-btn>
            
        </v-overlay>
</template>

<script>
import {db} from "../db"
import { eventBus } from '../main'
//import {eventBus} from "../main"
export default {
    data() {
        return {
            users: [],
            picker: null,
            date1: "",
            date2: "",
            items: ["По возрастанию", "По убыванию"],
            radios: '1',
            salesDB: [],
            selected: "asdasdasd",
            overlay: false,
            sellers: [],
            salesName: ""
            
        }
    },
    firestore() {
        return {
            users: db.collection('users'),
            salesDB: db.collection('sales')
        }
        
    },
    methods: {
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
            this.sales = this.sales.filter(item => {
                return (new Date(item.time.seconds * 1000) > new Date(this.date1))
            })

            this.sales = this.sales.filter(item => {
                return (new Date(item.time.seconds * 1000) < new Date(this.date2))
            })
        
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
        sortBySeller() {
            // eslint-disable-next-line no-unused-vars
            this.sales = this.sales.filter(item => {
                // eslint-disable-next-line no-constant-condition
                    // eslint-disable-next-line no-console
                   return item.seller.name == this.salesName

                
                    
                    


            })
        },
        sort() {
            
            this.sales = this.salesDB
            
            if (this.date1 != null && this.date1 != undefined && this.date1 != " " && this.date2 != 0 && this.date2 != null && this.date2 != undefined && this.date2 != " " && this.date2 != 0 ){
                this.dateforto()
            }
            
            
            if (this.radios == "1") {
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
            if (this.radios == "2") {
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
            if (this.radios == "3") {
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
            if (this.salesName != "") {
                this.sortBySeller()
            }
                

                
            

            
            

            eventBus.$emit('sort-data', {
                sales: this.sales
            })

            this.sales = this.salesDB

        },

        revert() {
            this.sales = this.salesDB
            eventBus.$emit('sort-data', {
                sales: this.sales
            })
            this.salesName = ""

        },
        back() {
            this.overlay = false
            eventBus.$emit('sort-open', {
                overlay: this.overlay
            })
        },
        allUsers() {
            for (let item of this.users) {
                this.sellers.push(item.name)
            }
        }
    },
    computed: {

        
    },
    mounted() {
        this.allUsers()
    },
    created() {
        eventBus.$on('sort-open', data => {
            this.overlay = data.overlay
        })
        
        

    },

}
</script>

<style lang="sass" scoped>

.buttons
    margin-top: 20%
    margin-left: 10%

</style>