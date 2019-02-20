import {VIEW_GAIN,VIEW_GAIN_ERR } from '../constants/Constants';

const initalState ={
    marketGain:[],
    err:null
}

export const gainReducer = (state=initalState,action) => {
    switch(action.type){
        case VIEW_GAIN:
            return{
                ...state,
                err:null,
                marketGain:action.payload
            }
        case VIEW_GAIN_ERR:
            return{
                ...state,
                marketGain:[],
                err:action.payload
            }
        default:
            return state;
    }
}