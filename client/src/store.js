import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

export const store = createStore(initialState, compose(
      applyMiddleware(...middleware)
    ))
