import { COURSE_LOADING, ADD_COURSE, EDIT_COURSE, GET_COURSES, GET_COURSE, DISPLAY_COURSE_LESSONS, DELETE_COURSE } from '../actions/types';

const initialState = {
  courses: [],
  course: {},
  courseLessons: [],
  likes: [],
  loading: false
}

export default function courseReducer (state = initialState, action) {
  switch(action.type) {
    case COURSE_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_COURSE:
      return {
        ...state,
        course: action.payload,
      }
    case EDIT_COURSE:
      return {
        ...state.filter(course => course.id !== action.payload.id),
        course: action.payload
      }
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      }
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false
      }
    case DISPLAY_COURSE_LESSONS:
      return {
        ...state,
        courseLessons: action.payload,
        loading: false
      }
    case DELETE_COURSE:
      return {
        ...state,
        course: state.courses.filter(course => course._id !== action.payload)
      }
    default:
      return state
  }
}
