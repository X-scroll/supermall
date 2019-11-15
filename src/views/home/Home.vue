<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probeType='3'>
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']" class="tabcontrol" @itemclick="tabclick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <BackTop @click.native="backtop"></BackTop>
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
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

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
      },
      currentType: "pop"
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    Scroll,
    BackTop,
    HomeRecommendView,
    FeatureView
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    this.getHomeData("pop", 1);
    this.getHomeData("new", 1);
    this.getHomeData("sell", 1);
  },
  methods: {
    // 事件监听相关
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
    },
    backtop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 网络请求线管
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then(res => {

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    }
  }
};
</script>

<style scoped>
#home {
  width: 100vw;
  height: 100vh;
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
  z-index: 999;
}
.content {
  height: calc(100vh - 95px);
  overflow: hidden;
}
</style>