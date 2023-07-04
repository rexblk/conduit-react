import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/user/userAuthSlice'
import request from '../utils/request'
import { useState } from 'react'

type User = {
  user: {
    username: string
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
      .catch((err) => setRegisterErr(err))

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      dispatch(setUser(data.user))
      queryClient.invalidateQueries({ queryKey: ['registerUser'] })
    }
  })
  return { registerUser: registerMutation, registerErr }
}

export default useUserAuth
