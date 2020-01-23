<template>
    <div>
		<div class='dropdown'>
			<div v-bind:class="{ show: options[0].isPressed }" class="dropdown_content">
				<ul>
					<li><a href="#">Открыть смену</a></li>
					<li><a href="#">Закрыть смену</a></li>
				</ul>
			</div>
			<div v-bind:class="{ show: options[1].isPressed }" class="dropdown_content">
				<ul>
					<li><a href="#">Открыть меню</a></li>
				</ul>
			</div>
			<div v-bind:class="{ show: options[2].isPressed }" class="dropdown_content">
				<ul>
					<li><a href="#">Движение товара</a></li>
					<li><a href="#">Принять товар</a></li>
					<li><a href="#">Отправить товар</a></li>
				</ul>
			</div>
			<div v-bind:class="{ show: options[3].isPressed }" class="dropdown_content">
				<ul>
					<li><a href="#">Изменить пароль</a></li>
					<li @click='unauth()'><a href="#">Выйти</a></li>
				</ul>
			</div>
		</div>
    </div>
</template>

<script>
import {eventBus} from '../main'
export default {
	name: 'dropdown',
	props: ['options'],
	data() {
		return {
		}
		
	},
	methods: {
		unauth() {
			eventBus.$emit('unauth', {
				authorized: false
			})
		}
	}
}
</script>

<style lang='sass' scoped>

.dropdown
	display: flex
	justify-content: center
	position: absolute
	left: 0
	right: 0
	z-index: 1000
	&_content
		display: block
		width: 200px
		margin-left: 50px
		text-align: center
		visibility: hidden
		z-index: 500
		&:first-child
			margin: 0
		ul 
			display: block
			list-style: none
			li
				display: block
				margin: 0 auto
				width: 150px
				height: 30px
				background: linear-gradient(90deg, rgba(144,38,215,1) 0%, rgba(143,0,161,1) 100%)
				font-size: 15px
				border-radius: 25px
				margin-top: 3px
				transition: 0.3s all ease
				z-index: 2
				line-height: 30px
				&:hover
					background: linear-gradient(90deg, rgba(143,0,161,1) 51%, rgba(144,38,215,1) 100%)
				a
					display: block
					margin-top: 4px
					text-decoration: none
					color: white
.show
	visibility: visible
</style>