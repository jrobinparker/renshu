import axios from 'axios';
import { GET_PROFILE, GET_PROFILE_BY_HANDLE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
        loading: false
      }))
    .catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: {}
    }))
}

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading())
  axios.get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE_BY_HANDLE,
        payload: res.data,
        loading: false
      }))
      .catch(err =>
        dispatch({
          type: GET_PROFILE_BY_HANDLE,
          payload: {}
        }))
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
