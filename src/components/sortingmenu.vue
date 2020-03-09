<template> 
<v-overlay :value="overlay" class="overlay" opacity="0.1">
    <div class="open-menu">
        <v-container>
            <v-row>
                <v-col auto>
                    <v-row justify="start">
                        <span class="menu-title">Сортировка</span>
                    </v-row>
                </v-col>
                <v-col auto>
                    <v-row justify="end">
                        <v-btn @click="back()" x-large text light color="#3498db">
                            Закрыть
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container style="margin-top: -30px">
            <v-row>
                <v-col md="2" class="sorting-title">
                    <v-row justify="start">
                        <span>Сортировка по продавцу</span>
                    </v-row>
                    <v-row style="margin-top: 15px" justify="center">
                        <v-select offset-y filled dense v-model="salesName" light shaped placeholder="Сортировка по продавцу" :items="users" item-text="name"></v-select>
                    </v-row>
                <v-row justify="start">
                    <span>По возрастанию/убыванию</span>
                </v-row>
                <v-row style="margin-top: 10px" justify="start">
                    <v-select filled shaped dense placeholder="По возрастанию/убыванию" v-model="selected" light :items="items"></v-select>
                </v-row>
                </v-col>
                <v-col md="4" class="sorting-title">
                    <v-row justify="center">
                        <v-col md="4">
                            <v-row style="height: 27px" justify="center">
                               <v-spacer></v-spacer>
                            </v-row>
                            <v-row justify="center">
                                <v-radio-group row large light v-model="radios" :mandatory="false">
                                    <v-radio label="Сумме" color="#3498db" value="1"></v-radio>
                                </v-radio-group>
                            </v-row>
                        </v-col>
                        <v-col md="4">
                            <v-row align="center" justify="center">
                                <span>Сортировать по</span>
                            </v-row>
                            <v-row justify="center">
                                <v-radio-group row large light v-model="radios" :mandatory="false">
                                    <v-radio label="Полученной сумме" color="#3498db" value="2"></v-radio>
                                </v-radio-group>
                            </v-row>
                        </v-col>
                        <v-col md="4">
                            <v-row style="height: 27px" justify="center">
                                <v-spacer></v-spacer>
                            </v-row>
                            <v-row justify="center">
                                <v-radio-group row  large light v-model="radios" :mandatory="false">
                                    <v-radio label="Сдаче" color="#3498db" value="3"></v-radio>
                                </v-radio-group>
                            </v-row>
                        </v-col>
                         
                    </v-row>
                    
                </v-col>
                            <v-col md="1">
                <v-spacer></v-spacer>
            </v-col>
                <v-col class="sorting-title" md="2">
                    <v-row justify="center">
                        <span>Дата</span>
                    </v-row>
                    <v-row justify="center">

                        <v-menu
                            light
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            >
          <template v-slot:activator="{ on }">
            <v-text-field
              light
              v-model="date1"
              label="С даты"
              v-on="on"
              filled
              shaped
              dense
            ></v-text-field>
          </template>
          <v-date-picker v-model="date1"></v-date-picker>
        </v-menu>

                    </v-row>
                    <v-row justify="center">

                        <v-menu
                            light
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            >
          <template v-slot:activator="{ on }">
            <v-text-field
              light
              v-model="date2"
              label="По дату"
              v-on="on"
              filled
            shaped
              dense
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2"></v-date-picker>
        </v-menu>

                    </v-row>
                </v-col>
            <v-col md="1">
                <v-spacer></v-spacer>
            </v-col>
            <v-col md="2">
                <v-row justify="end">
                    <v-btn @click="sort()" rounded dark color="#3498DB">
                        Сортировать
                    </v-btn>
                </v-row>
                <v-row style="margin-top: 25px" justify="end">
                    <v-btn @click="revert()" rounded dark color="#CB6363">
                        Вернуть исходные значения
                    </v-btn>
                </v-row>
            </v-col>
            </v-row>

        </v-container>
    </div>
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
            selected: "",
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
.open-menu
    position: fixed
    height: 300px
    background: white
    width: 100%
    bottom: 0
    left: 0
    transfrom: translateX(-50%)
    color: black

.menu-title
    color: black
    font-weight: 500
    font-size: 24px

.sorting-title
    font-weight: 600
    font-size: 18px

</style>