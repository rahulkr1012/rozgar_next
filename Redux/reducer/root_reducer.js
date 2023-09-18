import { combineReducers, createStore } from "redux";
import { createStoreHook } from "react-redux"; 
import { userData , sampleData ,resumeData } from "./user_data";
import { composeWithDevTools } from 'redux-devtools-extension';



const createRootReducer = combineReducers({
     createUser: userData,
     sampleData:sampleData,
     resumeData
   });
 
   
 export default createRootReducer  ; 

 