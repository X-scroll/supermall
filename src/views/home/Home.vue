<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control :titles="['流行','新款','精选']"  @itemclick="tabclick" ref='tabControl1' 
     class="tabcontrol" v-show="istabfixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" 
    :pull-up-load='true'
    @scroll="contentscroll"
    @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperload='swiperload'></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']"  @itemclick="tabclick" ref='tabControl2'></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <BackTop @click.native="backtop" v-show="needTop"></BackTop>
   
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childrenComponents/HomeSwiper";
import HomeRecommendView from "./childrenComponents/HomeRecommendView";
import FeatureView from "./childrenComponents/FeatureView";

import { getHomeMultidata, getHomeData } from "network/home";
import {debounce} from 'common/utils';
import {itemListenerMixin,backTopMixin} from "common/mixin";
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
      currentType: "pop",
      probetype: 3,
      tabOffetTop:0,
      istabfixed:false,
    };
  },
  mixins:[itemListenerMixin,backTopMixin],
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    Scroll,
    HomeRecommendView,
    FeatureView
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
  },
  deactivated() {
    
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeData("pop", 1);
    this.getHomeData("new", 1);
    this.getHomeData("sell", 1);
  },
  mounted() {
    // // 1.图片加载完的事件监听
    // let refresh = debounce(this.$refs.scroll.refresh,200)
    // // 对监听事件进行保存
    // this.itemImageListener = ()=>{
    //   refresh()
    // }
    //  this.$bus.$on('itemImageLoad',this.itemImageListener)
    
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentscroll(position) {
      // 1.判断backtop是否显示
      this.listenerNeedTop(position)
      // 决定tab按钮是否吸顶
      this.istabfixed = -(position.y)>this.tabOffetTop
    },
    loadMore(){
      getHomeData(this.currentType)
   },
   swiperload(){
     this.tabOffetTop = this.$refs.tabControl2.$el.offsetTop
     
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

        // 完成加载
        this.$refs.scroll.finishPullUp()
      })
    }
  }
};
</script>

<style scoped>
#home {
  width: 100vw;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  z-index: 10;
  position: relative;
 /* position: fixed;
   top: 0;
  left: 0;
  right: 0;
  z-index: 999; */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tabcontrol{
  position: relative;
  z-index: 99;
  background-color: #ffffff;
}
</style>