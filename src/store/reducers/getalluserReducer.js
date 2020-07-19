import {
  ALL_USERS
} from '../../types';


const initialState = {
  allUser: []
}


export default function (state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case ALL_USERS:
      return {
        ...state,
        ...payload,
        allUser: payload 
      };
    default:
      return state;
  }
}