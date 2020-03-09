<template>
	<div v-if="0">
		<div class="buttons" :key="index" v-for="(option, index) of selections">
			<v-btn dark x-large outlined rounded color="#3498db" class="buttons-btn" @click="clicked(option)">{{option.title}}</v-btn>
		</div>		
	</div>
</template> 

<script>
import {eventBus} from '../main'
export default {
	name: 'menuLower',
	data() {
		return {
			
			selections: [
				{id: 1, title: 'Быстрая продажа', isPressed: true, disabled: false},
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
@import "@/sass/_variables"
div
	display: flex
	justify-content: center
	margin-top: 1vh
	.buttons
		margin-left: 2%
		&-btn
			width: 200px
		&:first-child
			margin: 0
			margin-top: 1vh			
		
</style>