<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  components:{
      Swiper,
      SwiperItem
  },
  data() { 
    return {
      isLoad:false
    }
  },
  methods: {
    imageLoad(){
      if(!this.isLoad){

      this.$emit('swiperload')
      this.isLoad = true
      }
    }
  },
  props:{
      banners:{
          type:Array,
          default(){
              return []
          }
      }
  }
 }
</script>

<style scoped>
</style>