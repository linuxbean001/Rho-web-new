import { VIEW_MARKET,VIEW_MARTKET_ERR } from '../constants/Constants';

const initalState ={
    userMarket:[],
    err:null
}

export const marketReducer = (state=initalState,action) => {
    switch(action.type){
        case VIEW_MARKET:
            return{
                ...state,
                err:null,
                userMarket:action.payload
            }
        case VIEW_MARTKET_ERR:
            return{
                ...state,
                userMarket:[],
                err:action.payload
            }
        default:
            return state;
    }
}