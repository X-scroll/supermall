<template>
  <div class="cart">
    <NavBar class="navbar">
      <div slot="center">购物车({{ length }})</div>
    </NavBar>
    <CartList></CartList>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from './childrenComponents/CartList'

import {mapGetters} from "vuex"
export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList
  },
  computed: {
    // ...mapGetters(["cartLength", "cartList"])
    ...mapGetters({
      length:'cartLength'
    })
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>
