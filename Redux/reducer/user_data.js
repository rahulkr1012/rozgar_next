import actions from './../actions'


export function userData(state ={
    sample:'data'
} ,  action ) {
   

switch(action.type) {
     
   case actions.USER_DATA:
      return {...state }
   default:
     return state 

     }
     
} 



   
export function resumeData(state = { result:"" } , action  ){
switch(action.type) {
   case actions.RESUME_DATA:
      return { ...state , result:action.payload.data  }
   default:
     return state 

     }

}  
    


export function sampleData(state ={
   id:'232'
} ,  action ) {
    
switch(action.type) {
    
  case action.USER_DATA:
     return {...state }
  default:
    return state 

    }
    
} 

