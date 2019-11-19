<template>
      <swiper class="swiper-box">
          <swiper-item v-for="(item,index) in topImages" :key="index">
             <img :src="item" alt="">
          </swiper-item>
      </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props:{
      topImages:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components:{
Swiper,SwiperItem
  },
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
.swiper-box{
    height: 300px;
    overflow: hidden;
}
</style>