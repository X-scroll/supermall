<template>
  <div class="check-button" :class="{check:isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
export default {
  name: 'CheckButton',
  data() { 
    return {

    }
  },
  props:{
      isChecked:{
          type:Boolean,
          default(){
              return false
          }
      }
  }
 }
</script>
<style scoped>
.check-button{
    border-radius: 50%;
    border: 2px solid #f5f5f5;
}
.check{
    background-color: red;
}
</style>