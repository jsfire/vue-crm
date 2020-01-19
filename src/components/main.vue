<template>
    <div>
        <menuUpper/>
        <menuSelection/>
        <menuLower/>
    </div>
</template>

<script>
import menuUpper from '@/components/menuUpper'
import menuSelection from '@/components/menuSel'
import menuLower from '@/components/menuLower'
export default {
    name: 'menuMain',
    components:  {
        menuUpper, menuSelection, menuLower
    },
}
</script>

<style lang="sass">
    
</style>