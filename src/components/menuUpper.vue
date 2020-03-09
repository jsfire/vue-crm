<template>
<div>
  <v-app-bar>
		<v-container fluid class="cont">
			<v-row align="center">
				<v-col sm="2" md="2">
					<v-row justify="start">
						<userbar/>
					</v-row>
					
				</v-col>
				
				<v-col sm="2" md="2">
					<v-row justify="start">
						<clock/>
					</v-row>
				</v-col>
				
				<v-col md="7">
					<v-row justify="center">
						<menubutton/>
					</v-row>
				</v-col>
				<v-col sm="1" md="1">
					<v-row justify="center">
						<opencart/>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
			
  </v-app-bar>
</div>
</template>

<script>
import userbar from "../components/userbar"
import menubutton from '../components/menuUpperButton'
import clock from "../components/clock"
import opencart from "../components/opencart"
export default {
  name: "menuUpper",
  components: {menubutton, clock, userbar, opencart},
  data() {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>
.cont
	width: 100%
		
</style>