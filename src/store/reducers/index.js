import {combineReducers} from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import getnewsReducer from './getnewsReducer';
import getdetailReducer from './getdetailReducer';
import getdetailuserReducer from '../reducers/getdetailuserReducer';
import createnewsReducer from '../reducers/createnewsReducer';
import getdetailcategoriesReducer from '../reducers/getdetailcategoriesReducer';
import getalluserReducer from '../reducers/getalluserReducer';
import catepageReducer from '../reducers/catepageReducer';
import getvideoReducer from '../reducers/getvideoReducer';

export default combineReducers({
  register1 : registerReducer,
  login1 : loginReducer,
  getnews1 : getnewsReducer,
  getdetail1 : getdetailReducer,
  user1 : getdetailuserReducer,
  createnews1 : createnewsReducer,
  categories1 : getdetailcategoriesReducer,
  getalluser1 : getalluserReducer,
  pagecate1 : catepageReducer,
  video1 : getvideoReducer
})