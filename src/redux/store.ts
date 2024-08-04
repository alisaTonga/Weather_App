import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import weatherSlice from "../features/weather/weatherSlice"


export const store = configureStore({
  reducer: {
    weathers: weatherSlice.reducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
