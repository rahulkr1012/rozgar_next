import { applyMiddleware, createStore, Store } from "redux";
import root_reducer from "Redux/reducer/root_reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import redux_thunk from 'redux-thunk'
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from '@reduxjs/toolkit'
let initalState=  { } 

// export  const store =  createStore(
//     root_reducer ,   
//     composeWithDevTools()
// );

const middleware = [redux_thunk]

// export const store = () => createStore(root_reducer, composeWithDevTools(applyMiddleware( ...middleware)) )
export const store = configureStore({
     reducer:root_reducer ,
     devtools:true
})
// const makeStore = () =>   configureStore({
//     reducer: root_reducer,
//     devTools: true,
// });



export const wrapper = createWrapper( store , {debug: false });

