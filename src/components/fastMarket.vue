<template>
    <div>
        <div class="cart">

        </div>
        <cart/>
        <div class='nom'>
            <item class='line-break'/>
        </div>
    </div>
</template>

<script>
import item from '@/components/listofGoods';
import cart from '@/components/cart'
export default {
    name: 'fastMarket',
    components: {item, cart
    }
}
</script>

<style lang="sass">
.nom
    display: grid
    grid-template-columns: repeat(4, 1fr)
    //grid-template-rows: repeat(3, 100px)

</style>