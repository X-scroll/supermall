<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view></feature-view>

    <tab-control :titles="['流行','新款','精选']" class="tabcontrol"></tab-control>
    <goods-list :goods='goods["pop"].list'></goods-list>
    <ul>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
      <li>555</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childrenComponents/HomeSwiper";
import HomeRecommendView from "./childrenComponents/HomeRecommendView";
import FeatureView from "./childrenComponents/FeatureView";

import { getHomeMultidata, getHomeData } from "network/home";

export default {
  name: "Home",

  data() {
    return {
      // result : null
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      }
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    FeatureView
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    this.getHomeData('pop',1)
    this.getHomeData('new',1)
    this.getHomeData('sell',1)
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeData(type){
      const page = this.goods[type].page+1
      getHomeData(type, page).then(res => {
        console.log(res);
        
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
    });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.tabcontrol {
  position: sticky;
  top: 44px;
  background-color: #ffffff;
}
</style>