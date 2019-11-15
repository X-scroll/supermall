<template>
  <div class="goods">
      <goods-item v-for="(item,index) in goods" :key="index" :goods-item='item'></goods-item>
     {{goods}}
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: 'GoodsList',
  props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components:{
      GoodsItem
  },
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>