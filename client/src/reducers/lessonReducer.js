import { ADD_LESSON, EDIT_LESSON, GET_LESSONS, LESSON_LOADING, GET_LESSON, DELETE_LESSON } from '../actions/types';

const initialState = {
  lessons: [],
  lesson: {},
  loading: false
}

export default function lessonReducer (state = initialState, action) {
  switch(action.type) {
    case LESSON_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_LESSON:
      return {
        ...state,
        lesson: action.payload,
      }
    case EDIT_LESSON:
      return {
        ...state.filter(lesson => lesson.id !== action.payload.id),
        lesson: action.payload
      }
    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        loading: false
      }
    case GET_LESSON:
      return {
        ...state,
        lesson: action.payload,
        loading: false
      }
    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson._id !== action.payload)
      }
    default:
      return state
  }
}
