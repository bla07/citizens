import {GET_DETAIL_NEWS} from '../../types';


const initialState = {
  details : {
    picture: {
      secure_url: ''
    },
    description : '',
    listComment : [],
    date: '',
    media : '',
    user:{
      _id: ''
    }
  }
}

export default function (state = initialState, action) {
  const {type, payload} = action 

  switch(type){
    case GET_DETAIL_NEWS:
      return {
        ...state,
        ...payload,
        details : payload
      }

      default:
        return state
  }
}