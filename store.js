import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import competitionReducer from './features/competitionSlice'

export const store = configureStore({
  reducer: {
      basket: basketReducer,
      competition: competitionReducer
  },
});