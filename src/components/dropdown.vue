<template>
    <div>
		<div class='dropdown'>
			<div v-bind:class="{ show: options[0].isPressed }" class="dropdown_content">
				<ul>
					<li><router-link to="/about">Открыть смену</router-link></li>
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

export default {
	name: 'dropdown',
	props: ['options'],
	data() {
		return {
		}
		
	},
	
	
}
</script>

<style lang='sass' scoped>
@import "@/sass/_variables"
.dropdown
	display: none
	justify-content: center
	position: absolute
	left: 0
	right: 0
	z-index: 99
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
				background: $border-color
				
				border-radius: 25px
				margin-top: 3px
				transition: 0.3s all ease
				z-index: 2
				line-height: 30px
				&:hover
					background: #fff
				a
					display: block
					margin-top: 4px
					text-decoration: none
					color: white
					font-size: 15px
					&:hover
						color: black
.show
	visibility: visible
</style>