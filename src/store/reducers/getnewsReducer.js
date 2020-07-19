import {GET_NEWS} from '../../types';

const initialState ={
  news : [],
}

export default function (state = initialState, action) {
  const {type} = action;

  switch(type) {
    case GET_NEWS :
      return {
        ...state,
        ...action.payload,
        news : action.payload
      };
      default :
      return state;
  }
}