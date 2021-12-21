import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import { metersApi } from './meters.api';
import { readingsApi } from './readings.api';

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      [metersApi.reducerPath]: metersApi.reducer,
      [readingsApi.reducerPath]: readingsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(
            metersApi.middleware,
            readingsApi.middleware
        )
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
