import axios from 'axios';
import {GET_NEWS} from '../../types';


export const getNews = () => async dispatch => {
  try {
    const response = await axios.get (`https://citizensapp.herokuapp.com/api/v1/news/all`);
    dispatch ({
      type : GET_NEWS,
      payload : response.data.result
    });
  } catch (error) {}
}




