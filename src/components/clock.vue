<template>
    <div>
        <span class='hms'>{{hours}}:{{minutes}}:{{seconds}}</span>
        <span class='dmy'>{{day}}-{{month}}-{{year}}</span>
    </div>
</template>

<script>
export default {
    name: 'clocksss',
    data() {
        return {
            hours: '',
            minutes: '',
            seconds: '',
            day: '',
            month: '',
            year: ''
        }
    },
    mounted() {
        setInterval(() => {
            let now = new Date();

            this.hours = this.getZero(now.getHours());
            this.minutes = this.getZero(now.getMinutes());
            this.seconds = this.getZero(now.getSeconds());

            this.year = now.getFullYear();

            this.month = this.getZero(now.getMonth() + 1);

            this.day = this.getZero(now.getDate());

        }, 10);
    },
    methods: {
        updateClock() {
            
            

        },
        getZero(h) {
            let n = '0';
            if (parseInt(h) < 10) {
                return (n + h);
            }
            else {
                return h;
            }
        }
    }

}
</script>

<style lang='sass' scoped>

div
    position: absolute
    left: 15px
span
    margin-right: 25px


</style>