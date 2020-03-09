<template>
<div class="container">

   <div class="text-center">   
    <v-menu class="button" offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn @click="openBigSelling()" text :x-large="$vuetify.breakpoint.xlAndUp">Продажа</v-btn>
      </template>
      
    </v-menu>



	<v-menu class="button" offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn @click="openFastMarket()" text :x-large="$vuetify.breakpoint.xlAndUp">Быстрая продажа</v-btn>
      </template>
    </v-menu>

	<v-menu class="button" offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn @click="openOrders()" text :x-large="$vuetify.breakpoint.xlAndUp">Заказы</v-btn>
      </template>
    </v-menu>


	<v-menu class="button" offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn @click="openReport()" text :x-large="$vuetify.breakpoint.xlAndUp">Отчёт</v-btn>
      </template>
    </v-menu>
    </div>
    

</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {eventBus} from '../main'
export default {
    name: "menuButton",
    data: () => ({
		fastMarket: false,
		report: false,
		globalSelling: false,
		orders: false,
    }),
    props: {
    name: {},
    method: {}
	},
	methods: {
		
			clicked(event) {
			this.selections[0].isPressed = false;
			this.selections[1].isPressed = false
			this.selections[2].isPressed = false
			this.selections[3].isPressed = false
			event.isPressed = !event.isPressed
			eventBus.$emit('clicksss', {
			firstButton: this.selections[0].isPressed,
			secondButton: this.selections[1].isPressed,
			thirdButton: this.selections[2].isPressed,
			fourthButton: this.selections[3].isPressed,
			})
		},
		openFastMarket() {
			this.fastMarket = false,
			this.report = false,
			this.globalSelling = false
			this.orders = false,
			this.fastMarket = !this.fastMarket
			eventBus.$emit('clicksss', {
			firstButton: this.fastMarket,
			secondButton: this.report,
			thirdButton: this.globalSelling,
			fourthButton: false,
			})
		},
		openReport() {
			this.fastMarket = false,
			this.report = false,
			this.globalSelling = false
			this.orders = false,
			this.report = !this.report

			eventBus.$emit('clicksss', {
			firstButton: this.fastMarket,
			secondButton: this.report,
			thirdButton: this.globalSelling,
			fourthButton: false,
			})
		},
		openOrders() {
			this.fastMarket = false,
			this.report = false,
			this.globalSelling = false
			this.report = false
			this.orders = !this.orders
			
			eventBus.$emit('clicksss', {
			firstButton: this.fastMarket,
			secondButton: this.report,
			thirdButton: this.globalSelling,
			fourthButton: this.orders,
			})
		},
		openMenu() {
			this.globalSelling = true
			eventBus.$emit('open-menu', {
			globalSelling: this.globalSelling
			})
		},
		openBigSelling() {
			this.fastMarket = false,
			this.report = false,
			this.globalSelling = false
			this.orders = false,
			this.globalSelling = !this.globalSelling
			eventBus.$emit('clicksss', {
			firstButton: this.fastMarket,
			secondButton: this.report,
			thirdButton: this.globalSelling,
			fourthButton: false,
			})
		}
  },
  created() {
            eventBus.$on('open-menu', data => {
            this.globalSelling = data.globalSelling
        })
  }

	
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.text-center
	display: flex
	justify-content: space-around
	span
		font-family: Roboto
		font-style: normal
		font-weight: 400
		font-size: 24px
		cursor: pointer
.item
	transition: 0.4s all
	cursor: pointer
.item:hover
	background: #ccc
</style>