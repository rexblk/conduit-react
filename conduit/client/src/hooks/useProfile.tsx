import request from '../utils/request'
import { useQuery } from 'react-query'

const useProfile = () => {
  const getUser = () =>
    request
      .get('/user')
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })

  const {
    isLoading: userLoading,
    isError: isUserError,
    data: userData,
    error: userError
  } = useQuery('get-user', getUser)

  return {
    userLoading,
    isUserError,
    userData,
    userError
  }
}

export default useProfile
