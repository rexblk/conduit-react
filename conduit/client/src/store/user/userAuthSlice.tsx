import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserAuthState {
  value: {
    userName: string
    token: string
  }
}

const initialState: UserAuthState = {
  value: {
    userName: '',
    token: ''
  }
}

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.value.userName = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.value.token = action.payload
    }
  }
})

export const { setUserName, setToken } = userAuthSlice.actions

const userAuthReducer = userAuthSlice.reducer
export default userAuthReducer
