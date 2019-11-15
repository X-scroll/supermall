<template>
  <div class="content">
    <ul>
      <li>fenlei1</li>
      <li>fenlei2</li>
      <li>fenlei3</li>
      <li>fenlei4</li>
      <li>fenlei5</li>
      <li>fenlei6</li>
      <li>fenlei7</li>
      <li>fenlei8</li>
      <li>fenlei9</li>
      <li>fenlei10</li>
      <li>fenlei11</li>
      <li>fenlei12</li>
      <li>fenlei13</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  mounted() { 
    this.scroll = new BScroll('.content',{
      probeType:3,
      pullUpLoad:true
    })
    this.scroll.on('scroll',(position)=>{
      console.log(position);

    })
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载');
      setTimeout(() => {
        
      this.scroll.finishPullUp()
      }, 1000);
    })
  }
};
</script>

<style scoped>
.content {
  height: 100px;
  background-color: pink;
  /* overflow-y: scroll; */
}
</style>