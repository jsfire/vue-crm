<template>
<v-app id="app">
		<v-overlay opacity="0.9" z-index="500" :value="!authorized">

			<div class='login_form'>
				<div>
					Авторизация в системе
				</div>
				<div class="input-text">
					<v-text-field class="form" placeholder="Login" type="login" outlined color="white" v-model="login" label="Login"></v-text-field>
				</div>
				<div class="input-text">
					<v-text-field class="form" placeholder="Password" type="password" outlined color="white" v-model="password" label="Password"></v-text-field>
				</div>
				
				<v-btn v-if="!load" @click="authorization()" color="#3498db">Войти</v-btn>

				<v-text-field v-if="load" color="#3498db" loading disabled></v-text-field>
			</div>

		</v-overlay>
		
		<menuMain/>
</v-app>
</template>


<script>
import menuMain from '@/components/main'
import { db } from './db'
import {eventBus} from "./main"
export default {
	name: 'app',
	components: {
	menuMain
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
			load: false
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
					this.load = true
					setTimeout(() => {
						this.authorized = true
						eventBus.$emit('username', {
						user: {name: this.username, id: this.userDB[i].id}
						})
						this.load = false
					}, 1000)
					
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
@import "../src/sass/_variables"
* 

body


	
#app 
	text-align: center
	margin: 0
	padding: 0

	.upperBar
		display: flex
		justify-content: center
		align-content: center
		background: black
		font-size: 20px
		padding: 2px 0 2px 0
		color: white
		height: 35px
		&_logo
			display: block	
			width: 40px
			height: 25px
.login_form
	width: 500px
	height: 500px
	display: grid
	border-radius: 50px
	align-items: center
	justify-items: center
	font-size: 20px

.input-text
	margin-top: 25px

</style>