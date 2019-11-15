<template>
  <div class="tabcontrol">
      <div v-for="(item,index) in titles" :key="index" class="tabcontrol-item" @click="tabclick(index)">
          <span :class="{tabactive:index==currentIndex}">{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
      titles:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data() { 
    return {
        currentIndex:0
    }
  },
  methods: {
      tabclick(index){
          this.currentIndex = index
          this.$emit('itemclick',index)
      }
  },
 }
</script>

<style scoped>


.tabcontrol{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
}
.tabcontrol-item{
    flex: 1;
}
.tabactive{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
    padding: 5px;
}
</style>