import {UPLOAD_NEWS_SUCCESS, UPLOAD_NEWS_FAIL} from '../../types';


const initialState ={
  dataNews : {
    title : '',
    description : '',
    category : [],
  },
  isLoading : true,
}

export default function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case UPLOAD_NEWS_SUCCESS:
      return {
        ...state,
        ...payload,
        dataNews: action.data,
        isLoading: false
      }
      case UPLOAD_NEWS_FAIL :
        return {
          ...state,
          isLoading : true
        }
        default : 
        return state;
  }
}