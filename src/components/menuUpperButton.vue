<template>
<div class="container">
    <div class="text-center">
    <v-menu offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn
          dark
			rounded
          v-on="on"
          class="buttonPr"
		x-large
		outlined
		color="#3498db"
		
		
        >
          Смена
        </v-btn>
      </template>
      <v-list >
        <v-list-item class="item">
          <v-list-item-title >Открыть смену</v-list-item-title>
        </v-list-item>
        <v-list-item  class="item">
          <v-list-item-title >Закрыть смену</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

        <v-menu offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn
          dark
			rounded
          v-on="on"
          class="buttonPr"
		x-large
		outlined
		color="#3498db"
		
		
        >
          Продажа
        </v-btn>
      </template>
      <v-list >
        <v-list-item @click="openMenu()" class="item">
          <v-list-item-title >Открыть меню продажи</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

	<v-menu offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn
          dark
			rounded
          v-on="on"
          class="buttonPr"
		x-large
		outlined
		color="#3498db"
		
		
        >
          Товар
        </v-btn>
      </template>
      <v-list >
        <v-list-item class="item">
          <v-list-item-title >Движение товара</v-list-item-title>
        </v-list-item>
        <v-list-item  class="item">
          <v-list-item-title >Принять товар</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
	<v-menu offset-y transition="slide-y-transition" >
      <template v-slot:activator="{ on }">
        <v-btn
          dark
			rounded
          v-on="on"
          class="buttonPr"
		x-large
		outlined
		color="#3498db"
		
		
        >
          Учётная запись
        </v-btn>
      </template>
      <v-list >
        <v-list-item class="item">
          <v-list-item-title >Изменить пароль</v-list-item-title>
        </v-list-item>
        <v-list-item @click="unauth()" class="item">
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>
      </v-list>
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
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
      ],
      globalSelling: false
    }),
    props: {
    name: {},
    method: {}
	},
	methods: {
		unauth() {
			eventBus.$emit('unauth', {
				authorized: false
			})
    },
    openMenu() {
      this.globalSelling = !this.globalSelling
      eventBus.$emit('open-menu', {
        globalSelling: this.globalSelling
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
.container
	display: flex
	justify-content: space-between
	.buttonPr
		width: 200px
		margin-left: 2%
.item
	cursor: pointer
	transition: 0.3s all
	&:hover
		background: rgba(0,0,0,0.3)
.text-center
	width: 100vw
</style>