import {REGISTER_SUCCESS, REGISTER_FAIL} from '../../types';


const initialState ={
  // token : localStorage.getItem('token'),
  isAuthenticated : null,
  error : [],
  loading : true
}


export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case REGISTER_SUCCESS :
      return {
        ...state,
        ...payload,
        isAuthenticated : true,
        loading : false
      };
      case REGISTER_FAIL :
        localStorage.removeItem('token')
        return {
          ...state,
          isAuthenticated: false,
          loading : false,
          errors : payload
        }
        default :
        return state;
  }
}