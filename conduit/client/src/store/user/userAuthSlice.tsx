import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserAuthState {
  value: {
    user: {
      username: string
      token: string
      image: string
      bio: string
      email: string
    }
  }
}

const initialState: UserAuthState = {
  value: {
    user: {
      username: '',
      token: '',
      image: '',
      bio: '',
      email: ''
    }
  }
}

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.value.user = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.value.user.username = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.value.user.token = action.payload
    }
  }
})

export const { setUserName, setToken, setUser } = userAuthSlice.actions

const userAuthReducer = userAuthSlice.reducer
export default userAuthReducer
