<template>
  <div class="tabitem" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activedStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    path: String,
    activedColor:{
        type:String,
        default:'red'
    }
  },
  data() {
    return {
    //   isActive: true
    };
  },
  computed: {
      isActive(){
        //   使用计算属性 返回值为判断当前路径是否等于按钮所传值的路径
          return this.$route.path.indexOf(this.path) !== -1
      },
      activedStyle(){
          return this.isActive?{color:this.activedColor}:{}
      }
  },
  methods: {
    itemClick() {
      if (this.$route.path != this.path) {
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style scoped>
.tabitem {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tabitem img {
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
  width: 24px;
  height: 24px;
}
</style>