import { SET_PROMISE } from "../actions/actionType";


const INITIAL_STATE = {
    promise:null,
}

const promiseReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_PROMISE:
            return{
                ...state,
                promise:action.promise,
            };

            default:
                return state;
    }
}


export default promiseReducer;