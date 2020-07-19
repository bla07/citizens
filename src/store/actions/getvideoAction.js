import axios from 'axios';
import {GET_VIDEO} from '../../types';


export const getVideo = () => async dispatch => {
  try{
    const response = await axios.get (`https://citizensapp.herokuapp.com/api/v1/news/findcategory/Video`);
    dispatch({
      type : GET_VIDEO,
      payload : response.data.result
    })
  } catch(error){}
}

