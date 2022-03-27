import { FB_USER } from "../actions/actionType";


const INITIAL_STATE = {
    fbuser:null,
}

const fbReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FB_USER:
            return{
                ...state,
                fbuser:action.fbuser,
            };

            default:
                return state;
    }
}


export default fbReducer;