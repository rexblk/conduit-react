import request from '../utils/request'
import { useQuery } from 'react-query'

type ParamsType = {
  tag?: string
  author?: string
  favorited?: string
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

const useArticle = ({ tag, author, favorited, offset, limit }: ParamsType) => {
  const {
    isLoading: isArticlesLoading,
    isError: isArticlesError,
    data: articles,
    error: articlesError
  } = useQuery('get-articles', () =>
    getArticles({ tag, author, favorited, offset, limit })
  )
  return {
    isArticlesLoading,
    isArticlesError,
    articles,
    articlesError
  }
}

export default useArticle
