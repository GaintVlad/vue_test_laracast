<template>
    <div>
        <div v-if="(remaining <= 0)" v-text="expiredText"></div>
        <div v-else>
            <span>{{remaining.days()}} Days</span>
            <span>{{remaining.hours()}} Hours</span>
            <span>{{remaining.minutes()}} Minutes</span>
            <span id="seconds">{{remaining.seconds()}} Seconds</span>
            left...
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "Countdown",
        props: {until: null, expiredText: {default:'Now Expired'}},
        data() {
            return {
                now: new Date(),

            }
        },
        computed: {
            remaining() {
                let remaining = moment.duration(Date.parse(this.until) - this.now)
                if (remaining <= 0)
                    this.$emit('finished')

                return remaining;
            }
        },
        created() {
            this.interval = setInterval( () => {
                this.now = new Date();
            }, 1000)
            this.$on('finished', ()=>{clearInterval(this.interval)})
        },
        destroyed() {
            clearInterval(this.interval)
        }
    }
</script>

<style scoped>

</style>