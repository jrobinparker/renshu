import axios from 'axios'
import { ADD_COURSE, EDIT_COURSE, GET_COURSES, GET_COURSE, DISPLAY_COURSE_LESSONS, DELETE_COURSE, COURSE_LOADING } from './types'

export const addCourse = (courseData, history) => dispatch => {
  axios.post('/api/courses/new', courseData)
  .then(res =>
    dispatch({
      type: ADD_COURSE,
      payload: res.data
    })
  )
  .catch(err => console.log(err))
}

export const editCourse = (id, courseData, history) => dispatch => {
  axios.patch(`/api/courses/${id}`, courseData)
  .then(res =>
    dispatch({
      type: EDIT_COURSE,
      payload: res.data
    })
  )
  .catch(err => console.log(err))
}

export const getCourses = () => dispatch => {
  dispatch(setCourseLoading())
  axios.get('/api/courses')
    .then(res => dispatch({
      type: GET_COURSES,
      payload: res.data
    }))
}

export const setCourseLoading = () => {
  return {
    type: COURSE_LOADING
  }
}

export const getCourse = (id) => dispatch => {
  dispatch(setCourseLoading())
  let lessonIds = []
  axios.get(`/api/courses/${id}`)
    .then(res =>
      dispatch({
        type: GET_COURSE,
        payload: res.data
      }))
    .then(res => lessonIds.concat(res.payload.lessons))
    .then(lessonIds => getCourseLessons(lessonIds))

    async function getCourseLessons(lessonIds) {
      let courseLessons = []
      for (let lessonId of lessonIds) {
        const { _id } = lessonId
        await axios.get(`/api/lessons/${_id}`)
          .then(res => courseLessons.push(res.data))
      }
      dispatch(displayCourseLessons(courseLessons))
    }
}

export const displayCourseLessons = courseLessons => dispatch => {
  dispatch(setCourseLoading())
  dispatch({
    type: DISPLAY_COURSE_LESSONS,
    payload: courseLessons
  })
}

export const deleteCourse = (id) => dispatch => {
  axios
    .delete(`/api/courses/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_COURSE,
        payload: id
      }))
}
