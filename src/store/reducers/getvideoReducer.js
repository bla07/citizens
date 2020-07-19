import {GET_VIDEO} from '../../types';


const initialState = {
  allVideo :[]
}

export default function (state = initialState, action){
  const {type, payload} = action;

  switch(type){
    case GET_VIDEO:
      return{
        ...state,
        ...payload,
        allVideo:payload
      };
      default:
        return state
  }
}