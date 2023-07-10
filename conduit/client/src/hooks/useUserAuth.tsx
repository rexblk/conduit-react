import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setToken, setUser } from '../store/user/userAuthSlice'
import request from '../utils/request'
import { useState } from 'react'

type User = {
  user: {
    username: string
    email: string
    password: string
  }
}

type Login = {
  user: {
    email: string
    password: string
  }
}

const useUserAuth = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [registerErr, setRegisterErr] = useState(null)

  const registerUser = (data: User): Promise<any> =>
    request
      .post('/users', data)
      .then((res) => res.data)
      .catch((err) => {
        setRegisterErr(err)
        throw err
      })

  const loginUser = (data: Login): Promise<any> =>
    request
      .post('/users/login', data)
      .then((res) => res.data)
      .catch((err) => {
        setRegisterErr(err)
        throw err
      })

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      const { token, ...userWithoutToken } = data.user
      dispatch(setUser(userWithoutToken))
      dispatch(setToken(token))
      queryClient.invalidateQueries({ queryKey: ['registerUser'] })
    }
  })

  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      const { token, ...userWithoutToken } = data.user
      // dispatch(setUser(userWithoutToken))
      dispatch(setToken(token))
      queryClient.invalidateQueries({ queryKey: ['loginUser'] })
    }
  })
  return {
    registerUser: registerMutation,
    loginUser: loginMutation,
    registerErr
  }
}

export default useUserAuth
