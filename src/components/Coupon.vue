<template>
  <div class="hello">
    <h4 v-html="vel_msg"></h4>
    <input id="couponCode" type="text" placeholder="code" v-model="code" @input="validate"/>
    <p v-if="valid">Coupon Redemed {{message}}</p>
    <p v-else-if="valid !== null && !valid">Invalid Coupon Code</p>
  </div>
</template>

<script>
export default {
  name: 'Coupon',
  props:['vel_msg'],
  data () {
    return {
        code: null,
        valid: null,
        coupon: [
            {
                mess: '50% off!',
                code: '50FF',
                discount: 50
            },
            {
                mess: 'Entirely FREE',
                code: '100FF',
                discount: 100
            },
        ],
    }
  },
    computed: {
      selectedCupon() {
          return this.coupon.find(e=> e.code == this.code);
      },
      message() {
          return this.selectedCupon.mess;
      }
    },
    methods: {
      validate () {

          this.valid = !! this.selectedCupon;

          if (this.valid ) {
              this.$emit('applied', this.selectedCupon.discount)
          }
      }
    }
}
</script>
<style>
</style>
