import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import word from "./modules/word";


const middlewares = [thunk];

//리듀서들을 다 묶을 때 rootReducer 생성
const rootReducer = combineReducers({ word });

const enhancer = applyMiddleware(...middlewares);

// store 생성. store 는 리듀서를 뭉친 rootReducer 와 옵션(미들웨어, 옵셔널한 것들)들을 엮어서 생성함.
const store = createStore(rootReducer, enhancer);

export default store;