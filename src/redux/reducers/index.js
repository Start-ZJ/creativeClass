import { combineReducers } from 'redux';
import products from './products-reducer';
import UserState from './cart-reducer';

// 将所有的子状态合并在一起，然后分发到react组件中
const allReducers = {
  UserState: UserState,//用于存储用户的信息
  products: products,
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;