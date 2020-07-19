import axios from 'axios';
import {GET_DETAIL_NEWS} from '../../types';


export const getDetail = id => async dispatch => {
  try {
    const response = await axios.get(`https://citizensapp.herokuapp.com/api/v1/news/id/${id}`);
    dispatch({
      type : GET_DETAIL_NEWS,
      payload : response.data.result
    });
  } catch (error) {} 
}
