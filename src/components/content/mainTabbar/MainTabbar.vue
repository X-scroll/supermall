<template>
  <Tabbar>
     <TabbarItem path='/home' activedColor='deeppink'>
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
     </TabbarItem>
     <TabbarItem path="/category" activedColor='deeppink'>
       <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon">
       <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
     </TabbarItem>
     <TabbarItem path='/cart' activedColor='deeppink'>
       <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-icon">
       <img src="~assets/img/tabbar/cart_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
     </TabbarItem>
     <TabbarItem path='/profile' activedColor='deeppink'>
       <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon">
       <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
     </TabbarItem>
    </Tabbar>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar";
import TabbarItem from "components/common/tabbar/TabbarItem"
export default {
  name: 'MainTabbar',
  data() { 
    return {

    }
  },
  components:{
      Tabbar,
      TabbarItem
  }
 }
</script>

<style lang="" scoped>
</style>