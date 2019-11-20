import {
    ADD_COUNT,
    ADD_CART
} from "./mutations-types"


export default{
    addToCart(context,payload){
        let oldProduct = context.state.cartList.find(item=>item.iid === payload.iid)
        if(oldProduct){
            // oldProduct.count +=1
            context.commit(ADD_COUNT,oldProduct)
        }else{
            payload.count = 1
            // state.cartList.push(payload)
            context.commit(ADD_CART,payload)
        }
    }
}