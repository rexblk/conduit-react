import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setToken, setUserName } from '../store/user/userAuthSlice'
import request from '../utils/request'

type User = {
  user: {
    username: string
    email: string
    password: string
  }
}

const registerUser = (data: User): Promise<any> =>
  request.post('/users', data).then((res) => res.data)

const useUserAuth = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log('resData: ', data)

      dispatch(setUserName(data.userName))
      dispatch(setToken(data.token))
      queryClient.invalidateQueries({ queryKey: ['registerUser'] })
    }
  })
  return { register: registerMutation }
}

export default useUserAuth
