import {GET_DETAIL_USER, GET_STATUS_NEWS_USER} from '../../types';

const initialState = {
  detailUser : {
    image : {
      secure_url : ''
    }
  },
  userNews : {
    news : []
  }
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch(type) {
    case GET_DETAIL_USER :
      return {
        ...state,
        ...payload,
        detailUser : payload
      };
      case GET_STATUS_NEWS_USER :
          return {
            ...state,
            ...action.payload,
            userNews : action.payload
          }
      default : 
      return state
  }
}