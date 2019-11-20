<template>
  <div id="detail">
    <DetailNavBar
      @titleClick="titleClick"
      class="detailnavbar"
      ref="nav"
    ></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo
        ref="comment"
        :commentInfo="commentInfo"
      ></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommend"></GoodsList>
    </Scroll>

    <BackTop @click.native="backtop" v-show="needTop"></BackTop>
    <DetailBottomBar @addToCart="addCart"></DetailBottomBar>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";

import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopY: [],
      getThemeY: null,
      currentIndex: null
    };
  },
  created() {
    //   保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid请求数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 保存详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 取出评论的信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
      });
      // 获取联动组件的offsetTop值
      this.getThemeY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopY.push(Number.MAX_VALUE);
      });
    });
  },
  mounted() {
    // this.themeTopY.push(0)
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },
    contentScroll(position) {
      // 获取y值
      let positionY = -position.y;

      let length = this.themeTopY.length;

      // positionY的值和组件中的值比较
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex != i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopY[i] &&
      //       positionY < this.themeTopY[i + 1]) ||
      //       (i == length - 1 && positionY >= this.themeTopY[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      // console.log(length);
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 混入方法的backTop
      this.listenerNeedTop(position);
    },
    addCart() {
      // 1.获取购物车需要展示的东西
      const product = {};
      // 图片，标题，描述，价格，*唯一标识
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      // console.log(product);
        this.$store.dispatch('addToCart', product)
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999999;
  background-color: #fff;
}
.content {
  height: calc(100vh - 100px);
}
</style>
