<template>
	<div id="app">
		<!-- <p :key='idx' v-for='(good, idx) in goods[0]'>name: {{good.name}} price: {{good.price}}</p> -->
		<div v-if='!authorized' class='authorization'>

			<div class='login_form'>
				<div>
					Авторизация в системе
				</div>
				<div>Логин:</div>
				<input type='login' v-model='login' placeholder='Введите ваш логин'>
				<div>Пароль:</div>
				<input type='password' v-model='password' placeholder='Введите ваш пароль'>
				<button @click='authorization()'>Войти</button>
			</div>

		</div>
		<div class="upperBar">
			<clocksss></clocksss>
			<img class='upperBar_logo' :src='image' alt="">
            <div class="upperBar_username">{{username}}</div>
		</div>
		<menuMain/>
	</div>
</template>


<script>
import menuMain from '@/components/main'
import clocksss from '@/components/clock'
import { db } from './db'
import {eventBus} from "./main"
export default {
	name: 'app',
	components: {
		clocksss, menuMain
	},
	data() {
		return {
			image: require('../src/assets/user.svg'),
			username: null,
			goods: {

			},
			login: null,
			password: null,
			authorized: false,
		}

	},
	created() {
		eventBus.$on('unauth', data => {
			this.authorized = data.authorized 	
		})
	},
	methods: {
		authorization() {
			for (let i = -0; i < this.userDB.length; i++) {
				if (this.userDB[i].login == this.login && this.userDB[i].password == this.password) {
					this.username = this.userDB[i].name
					this.authorized = true
					eventBus.$emit('username', {
						user: {name: this.username, id: this.userDB[i].id}
					})
				}
			}
		}
	},

	firestore() {
		return {
			goods: db.collection('goods'),
			userDB: db.collection('users')
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
	color: none
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
.authorization
	width: 1685px
	height: 842px
	background: rgba(0,0,0,0.9)
	position: absolute
	left: 50%
	transform: translate(-50%)
	z-index: 999
	display: flex
	justify-content: center
	align-items: center
.login_form
	width: 500px
	height: 500px
	background: #1a1a1a
	display: grid
	border-radius: 50px
	align-items: center
	justify-items: center
	color: white
	font-size: 20px
	grid-template-rows: 150px 25px 60px 60px 20px 250px
	border: 2px #9969ff solid 
	input
		width: 200px
		height: 40px
		text-align: center
		border-radius: 50px
		border: 2px #9969ff solid 
		outline: none
		font-size: 20px
	button
		width: 100px
		height: 40px
		background: #fff
		border: 2px solid #9969ff
		font-size: 20px
		border-radius: 50px
		outline: none
		transition: 0.2s all ease
		text-align: center
		cursor: pointer
		&:hover
			background: #9969ff
		&:active 
			background: #72db5a


</style>
