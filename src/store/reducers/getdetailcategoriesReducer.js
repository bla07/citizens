import {GET_DATA_CATEGORY} from '../../types';

const initialState = {
  categories : [
  ]
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch(type) {
    case GET_DATA_CATEGORY:
    return {
      ...state,
      ...payload,
      categories:payload
    }

    default:
    return state
  }
}
