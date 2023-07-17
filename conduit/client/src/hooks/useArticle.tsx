import request from '../utils/request'
import { useQuery } from 'react-query'

type ParamsType = {
  tag?: string
  author?: string
  favorited?: string
  offset?: number
  limit?: number
}

type LocalParamsType = {
  offset?: number
  limit?: number
}

const getArticles = (params: ParamsType) =>
  request
    .get('/articles', {
      params
    })
    .then((res) => res.data)
    .catch((err) => console.error('getArticlesErr: ', err))

const getLocalArticles = (params: LocalParamsType) =>
  request
    .get('/articles/feed', {
      params
    })
    .then((res) => res.data)
    .catch((err) => console.error('getLocalArticlesErr: ', err))

const getTags = () =>
  request
    .get('/tags')
    .then((res) => res.data?.tags)
    .catch((err) => {
      console.error('getTagsErr: ', err)
      throw err
    })

const useArticle = ({ tag, author, favorited, offset, limit }: ParamsType) => {
  const {
    isLoading: isArticlesLoading,
    isError: isArticlesError,
    data: articles,
    error: articlesError
  } = useQuery(
    ['get-articles', { tag, author, favorited, offset, limit }],
    () => getArticles({ tag, author, favorited, offset, limit }),
    { keepPreviousData: true }
  )

  const {
    isLoading: isLocalArticlesLoading,
    isError: isLocalArticlesError,
    data: articlesLocal,
    error: articlesErrorLocal
  } = useQuery(
    ['get-articles-local', { offset, limit }],
    () => getLocalArticles({ offset, limit }),
    { keepPreviousData: true }
  )

  const {
    isLoading: isTagsLoading,
    isError: isTagsError,
    data: tags,
    error: tagsError
  } = useQuery('get-tags', getTags)

  return {
    isArticlesLoading,
    isArticlesError,
    articles,
    articlesError,
    isLocalArticlesLoading,
    isLocalArticlesError,
    articlesLocal,
    articlesErrorLocal,
    isTagsLoading,
    isTagsError,
    tags,
    tagsError
  }
}

export default useArticle
