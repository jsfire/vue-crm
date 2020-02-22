<template>
    <div>
        <menuUpper />
        <menuSelection v-if="smth" />

        <menuLower v-if="smth"/>
    </div>
</template>

<script>
import menuUpper from '@/components/menuUpper'
import menuSelection from '@/components/menuSel'
import menuLower from '@/components/menuLower'
// import selling from '@/components/selling'
export default {
    name: 'menuMain',
    components:  {
        menuUpper, menuSelection, menuLower
    },
    data() {
        return {
            smth: true
        }
    }
}
</script>

<style lang="sass">
    
</style>