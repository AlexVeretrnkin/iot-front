import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import { metersApi } from './meters.api';
import { statsApi } from './stats.api';

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      [metersApi.reducerPath]: metersApi.reducer,
      [statsApi.reducerPath]: statsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(metersApi.middleware)
        .concat(statsApi.middleware),
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
