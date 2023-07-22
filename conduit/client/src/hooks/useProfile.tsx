import request from '../utils/request'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const followUser = (username: string) =>
  request
    .post(`/profiles/${username}/follow`)
    .then((res) => res.data)
    .catch((err) => {
      console.error('followUser Err: ', err)
      throw err
    })

const unFollowUser = (username: string) =>
  request
    .delete(`/profiles/${username}/follow`)
    .then((res) => res.data)
    .catch((err) => {
      console.error('followUser Err: ', err)
      throw err
    })

const useProfile = (slug?: string) => {
  const queryClient = useQueryClient()
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

  const handleSuccess = () => {
    queryClient.invalidateQueries('get-articles-local')
    if (slug !== undefined) {
      queryClient.invalidateQueries(`get-article-${slug}`)
    }
  }

  const followMutation = useMutation(followUser, {
    onSuccess: handleSuccess
  })

  const unFollowMutation = useMutation(unFollowUser, {
    onSuccess: handleSuccess
  })

  return {
    userLoading,
    isUserError,
    follow: followMutation,
    unfollow: unFollowMutation,
    userData,
    userError
  }
}

export default useProfile
