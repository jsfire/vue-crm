<template>
	<div id="app">
		<!-- <p :key='idx' v-for='(good, idx) in goods[0]'>name: {{good.name}} price: {{good.price}}</p> -->
		<div class="upperBar">
			<clocksss></clocksss>
			<img class='upperBar_logo' :src='image' alt="user-logo">
            <div class="upperBar_username">{{username}}</div>
		</div>
		<menuMain/>
	</div>
</template>


<script>
import menuMain from '@/components/main'
import clocksss from '@/components/clock'
import { db } from './db'
export default {
	name: 'app',
	components: {
		clocksss, menuMain
	},
	data() {
		return {
			image: '/imgs/user.png',
			username: 'John Doe',
			goods: {

			},
		}

	},
	// computed: {
	// 	parseData: () => {
	// 		for
	// 	}
	// },
	firestore() {
		return {
			goods: db.collection('goods')
		}
	}

}
</script>



<style lang="sass">

* 
	margin: 0
	padding: 0
	
#app 
	font-family: 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	text-align: center
	color: #2c3e50
	position: relative
	.upperBar
		display: flex
		justify-content: center
		align-content: center
		background: gray
		font-size: 20px
		padding: 2px 0 2px 0
		color: black
		&_logo
			display: block	
			width: 40px
			height: 25px


</style>
