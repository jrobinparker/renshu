import axios from 'axios'
import { ADD_LESSON, EDIT_LESSON, GET_LESSONS, LESSON_LOADING, GET_LESSON, DELETE_LESSON, GET_ERRORS } from './types'

export const addLesson = (lessonData, history) => dispatch => {
  axios.post('/api/lessons/new', lessonData)
  .then(res =>
    dispatch({
      type: ADD_LESSON,
      payload: res.data
    })
  )
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const editLesson = (id, lessonData, history) => dispatch => {
  axios.patch(`/api/lessons/${id}`, lessonData)
  .then(res =>
    dispatch({
      type: EDIT_LESSON,
      payload: res.data
    })
  )
  .then(res => history.push('/lessons'))
  .catch(err => console.log(err))
}

export const getLessons = () => dispatch => {
  dispatch(setLessonLoading())
  axios.get('/api/lessons')
    .then(res => dispatch({
      type: GET_LESSONS,
      payload: res.data
    }))
}

export const setLessonLoading = () => {
  return {
    type: LESSON_LOADING
  }
}

export const getLesson = (id) => dispatch => {
  dispatch(setLessonLoading())
  axios.get(`/api/lessons/${id}`)
    .then(res =>
      dispatch({
        type: GET_LESSON,
        payload: res.data
      }))
}

export const deleteLesson = (id) => dispatch => {
  axios
    .delete(`/api/lessons/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_LESSON,
        payload: id
      }))
}

export const addLike = (id) => dispatch => {
  axios.post(`/api/lessons/like/${id}`).then(res => dispatch(getLesson(id)))
}

export const removeLike = (id) => dispatch => {
  axios.post(`/api/lessons/unlike/${id}`).then(res => dispatch(getLesson(id)))
}

export const addComplete = (id) => dispatch => {
  axios.post(`/api/lessons/complete/${id}`).then(res => dispatch(getLesson(id)))
}

export const removeComplete = (id) => dispatch => {
  axios.post(`/api/lessons/uncomplete/${id}`).then(res => dispatch(getLesson(id)))
}
