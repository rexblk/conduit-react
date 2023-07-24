import { useSelector } from 'react-redux'
import request from '../utils/request'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { RootState } from '../store'

type ProfileTypes = {
  slug?: string
  username?: string
}

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

const useProfile = ({ slug, username }: ProfileTypes) => {
  const { token } = useSelector((state: RootState) => state.userAuth)
  const queryClient = useQueryClient()
  const getUser = () =>
    request
      .get('/user')
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })

  const getProfile = (username: any) => {
    console.log('getProfile called...', username)
    return request
      .get(`/profiles/${username}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('getProfileErr: ', err)
        throw err
      })
  }

  const {
    isLoading: userLoading,
    isError: isUserError,
    data: userData,
    error: userError
  } = useQuery('get-user', getUser, {
    enabled: !!token
  })

  const {
    isLoading: isProfileLoading,
    isError: isProfileError,
    data: profile,
    error: profileError
  } = useQuery(`get-profile-${username}`, () => getProfile(username), {
    enabled: !!username
  })

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
    userError,
    profile,
    isProfileLoading
  }
}

export default useProfile
