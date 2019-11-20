<template>
  <div class="cartlist">
    <scroll class="content" ref="scroll">
        <CartListItem v-for="(item,index) in cartList" 
        :key='index' :item-info='item'>
        </CartListItem>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
      this.$refs.scroll.refresh()
  },
};
</script>

<style scoped>
.cartlist {
  overflow: hidden;
}
.content {
  height: calc(100vh - 91px);
}
</style>
