<template>
	<div>
			<button v-bind:class="{clicked: option.isPressed, disabled: option.disabled}" v-bind:key='idx' v-for='(option, idx) in selections' @click='clicked(option)'>
				{{option.title}}</button>
	</div>
</template>

<script>
import {eventBus} from '../main'
export default {
	name: 'menuLower',
	data() {
		return {
			
			selections: [
				{id: 1, title: 'Быстрая продажа', isPressed: false, disabled: false},
				{id: 2, title: 'Отчёт', isPressed: false, disabled: false},
				{id: 3, title: 'Возврат', isPressed: false, disabled: true},
				{id: 4, title: 'Ремонт', isPressed: false, disabled: true},
		]
		}
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
			

		}
	},
}
</script>


<style scoped lang="sass">

div
	margin-top: 30px
	display: flex
	justify-content: center
	button
		display: block
		width: 200px
		height: 60px
		border: 2px #9969ff solid
		text-align: center
		outline: none
		background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)
		font-size: 18px
		margin-left: 3px
		transition: 0.3s all ease
		cursor: pointer
		color: black
		&:first-child
			border-radius: 50px 0 0 50px
			margin: 0
		&:last-child
			border-radius:  0 50px 50px 0 
		&:hover
			color: white
			background: linear-gradient(90deg, rgba(144,38,215,1) 0%, rgba(143,0,161,1) 100%) 		


.clicked
	background: linear-gradient(90deg, rgba(144,38,215,1) 0%, rgba(143,0,161,1) 100%)
	color: white
.disabled
	color: gray
	border: 2px gray solid
</style>