import {LOGIN_ADMIN_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, GET_USER_FAIL} from '../../types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isAdmin: '',
  loading: true,
  user: null
}


export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case LOGIN_ADMIN_SUCCESS:
      localStorage.setItem('token', action.payload.result.token);
      localStorage.setItem('adminToken', action.payload.result.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isAdmin : payload.isAdmin,
        loading : false
      }; 
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.result.token);
      return {
        ...state,
        ...action.payload,
          isAuthenticated: true,
          isAdmin : payload.isAdmin,
          loading: false
      };
    case LOGIN_FAIL:
    case GET_USER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
          loading: false
      };
    default:
      return state;
  }
}
