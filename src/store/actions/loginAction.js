import axios from 'axios';
import setToken from '../../helpers/setToken';
import {GET_USER, GET_USER_FAIL, LOGIN_ADMIN_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL} from '../../types';

export const getUser = () => async dispatch => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const response = await axios.GET(`https://citizensapp.herokuapp.com/api/v1/user`);
    dispatch({
      type: GET_USER,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL
    })
  }
};


export const loginUser = SignIn => async dispatch => {
  try {
    const response = await axios.post(
      `https://citizensapp.herokuapp.com/api/v1/user/login`,
      SignIn,
    );
    console.log(response.data.result)
    switch (response.data.result.isAdmin) {
      case true:
        dispatch({
          type: LOGIN_ADMIN_SUCCESS,
          payload: response.data
        });
        break;
      case false:
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        });
        break;
      default:
        dispatch({
          type: LOGIN_FAIL
        })
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};