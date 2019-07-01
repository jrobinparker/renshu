import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import lessonReducer from './lessonReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  lesson: lessonReducer,
  course: courseReducer
})
