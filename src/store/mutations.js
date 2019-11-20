import {
    ADD_COUNT,
    ADD_CART
} from "./mutations-types"


export default{
    // mutations的唯一目的就是修改state的值
    // mutations中的每一个方法尽可能完成的事件简单一点
    [ADD_COUNT](state,payload){
        payload.count++
    },
    [ADD_CART](state,payload){
        payload.checked = true
        state.cartList.push(payload)
    }
}