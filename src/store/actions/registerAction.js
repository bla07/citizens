import axios from 'axios';

import {REGISTER_SUCCESS, REGISTER_FAIL} from "../../types";


export const register = SignUp => async dispatch => {
  console.log (SignUp);

  try {
    const response = await axios.post(
      `https://app-citizenjournalism.herokuapp.com/api/v1/user/`, SignUp
    );
    // console.log (response.data);
    dispatch ({
      type : REGISTER_SUCCESS,
      payload : response
    });
  } catch (error) {
    dispatch({
      type : REGISTER_FAIL
    })
  }
}

