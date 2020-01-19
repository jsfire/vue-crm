<template>
 
	<div>
		<div class='menu'>
			<button v-bind:key="idx" v-for="(item, idx) in options" v-on:click="item.isPressed = !item.isPressed">{{ item.title}}</button>
		</div>
		<dropdown
		v-bind:options='options'
		/>
	</div>

	
	
</template>

<script>
import dropdown from '@/components/dropdown'
export default {
	name: 'menuUpper',
	components: {
		dropdown
	},
	props: {

	},
	data() {
		return {
			options: [
				{id: 0, title: 'Смена', isPressed: false, counter: 0},
				{id: 1, title: 'Продажа', isPressed: false, counter: 0},
				{id: 2, title: 'Товар', isPressed: false, counter: 0},
				{id: 3, title: 'Учётная запись', isPressed: false, counter: 0}
			],
			
		}
		
	},
	methods: {
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.menu
	display: flex
	margin-top: 30px
	justify-content: center
	button
		width: 200px
		height: 60px
		background: #fff
		border: 2px solid #9969ff
		font-size: 20px
		border-radius: 50px
		outline: none
		transition: 0.3s all ease
		margin-left: 50px
		text-align: center
		cursor: pointer
		&:hover
			background: linear-gradient(90deg, rgba(144,38,215,1) 0%, rgba(143,0,161,1) 100%)
			color: white
		&:first-child
			margin: 0
		
</style>
