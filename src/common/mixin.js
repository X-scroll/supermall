import { debounce } from "./utils";
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    };
  },
  mounted() {
    // 1.图片加载完的事件监听
    let refresh = debounce(this.$refs.scroll.refresh, 200);
    // 对监听事件进行保存
    this.itemImageListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
    // console.log("woshi mixin");
  }
};

import BackTop from "components/content/backTop/BackTop";
import {ToTopValue} from "common/const"

export const backTopMixin={
  components:{
    BackTop
  },
  data() {
    return {
      needTop:false
    }
  },
  methods: {
    backtop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenerNeedTop(position){
      this.needTop = -(position.y)>ToTopValue
    }
  },
}