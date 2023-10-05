import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./../../Redux/reducer/root_reducer";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";


const bindMiddleware = (middleware) => {
  // if (process.env.NODE_ENV !== "production" ) {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  // }
  // return applyMiddleware(...middleware);
};

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

 
 
export const makeStore = ({ isServer })=> {
  if (isServer) {
    return createStore( rootReducer ,  bindMiddleware([thunk]));
  } else {
    const { persistStore, persistReducer } = require("redux-persist");

    const storage =
      typeof (window) !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();
    
        const persistConfig = {
      key: "myProject",
      // whitelist: ["visitedProducts", "user", "cart"],
      storage ,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
      persistedReducer,
      bindMiddleware([thunk])
    );

    store.__persistor = persistStore(store);
    
    return store;
     
  }
};



export const wrapper = createWrapper(makeStore, {
  debug: false,
});

