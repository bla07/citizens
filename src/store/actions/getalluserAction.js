import axios from 'axios';
import {ALL_USERS} from '../../types';

export const getAllUser = () => async dispatch => {
  try {
    const response = await axios.get(`https://citizensapp.herokuapp.com/api/v1/user`);
    dispatch({
      type : ALL_USERS,
      payload : response.data.result
    })
  } catch (error){}
}