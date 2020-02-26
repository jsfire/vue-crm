<template>
<div>
  <div>
    <menubutton/>
  </div>
</div>
</template>

<script>
import menubutton from '../components/menuUpperButton'
export default {
  name: "menuUpper",
  components: {menubutton},
  data() {
    return {
		buttons: [
			{id: 0, title: 'Смена', options: ["Открыть смену", "Закрыть смену"], },
			{id: 1, title: 'Продажа',options: ["Открыть меню продажи"]},
			{id: 2, title: 'Товар', options: ["Движение товара", "Принять товар", "Отправить товар"]},
			{id: 3, title: 'Учётная запись', options: ["Изменить пароль", "Выйти"]}
		],

    }
  }
}
</script>

<style lang="sass" scoped>
div
	display: flex
	justify-content: center
	margin: 0
	margin-top: 10px
	.buttonPress
		margin-left: 5%
		&:first-child
			margin: 0
			
		
</style>