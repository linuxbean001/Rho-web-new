import {VIEW_LOSS,VIEW_LOSS_ERR} from '../constants/Constants';

const initalState ={
    marketloss:[],
    err:null
}

export const lossReducer = (state=initalState,action) => {
    switch(action.type){
        case VIEW_LOSS:
            return{
                ...state,
                err:null,
                marketloss:action.payload
            }
        case VIEW_LOSS_ERR:
            return{
                ...state,
                marketloss:[],
                err:action.payload
            }
        default:
            return state;
    }
}