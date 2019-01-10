<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Coupon vel_msg="Welcome to Your Vue.js App"/>
    <question :question="question"/>
    <countdown />
  </div>
</template>

<script>
import Coupon from './components/Coupon'
import Question from './components/Question'
import Countdown from './components/Countdown'

export default {
    name: 'app',
    components: {
        Coupon, Question, Countdown
    },
    data() {
        return {
            question: {title: 'The Title', body: 'the body'}
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
