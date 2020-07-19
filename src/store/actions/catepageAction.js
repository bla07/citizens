import axios from 'axios';
import {GET_CATEGORIES_PAGINATION} from '../../types';


export const catePage = page => async dispatch => {
  try {
    const response = await axios.get(`https://app-citizenjournalism.herokuapp.com/api/v1/news/?page=${page}`)
    // console.log(response.data.result)
    dispatch({
      type : GET_CATEGORIES_PAGINATION,
      payload : response.data.result
    })
  } catch(error) {}
}