<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.recommends {
  display: flex;
  width: 100vw;
  justify-content: space-around;
  padding: 15px 0 15px;
  border-bottom: 10px solid #eeeeee;
}
.recommend-item {
  font-size: 14px;
  text-align: center;
}
.recommend-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
</style>