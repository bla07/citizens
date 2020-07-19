import {
  GET_CATEGORIES_PAGINATION
} from '../../types';


const initialState = {
  categoryPage: {}
}

export default function (state = initialState, action) {
  const {
    type,
    payload
  } = action

  switch (type) {
    case GET_CATEGORIES_PAGINATION:
      return {
        ...state,
        ...payload,
        categoryPage: payload
      }

      default:
        return state
  }
}