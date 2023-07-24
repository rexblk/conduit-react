import { Link, useNavigate, useParams } from 'react-router-dom'
import useArticle from '../../hooks/useArticle'
import dateConverter from '../../utils/dateConverter'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Comments from '../../components/Comments'
import useProfile from '../../hooks/useProfile'
import ArticleActions from './ArticleActions'

const Article = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { follow, unfollow } = useProfile({ slug: slug })
  const {
    article: articleData,
    isArticleLoading,
    favorite,
    unfavorite
  } = useArticle({ slug })
  const { token } = useSelector((state: RootState) => state.userAuth)
  const isAuth = !!token
  const article = articleData?.article
  const isFollowing = article?.author?.following
  const isFavorite = article?.favorited

  const handleFunc = async (
    name: string,
    bool: boolean,
    func1: any,
    func2: any
  ) => {
    if (func1?.isLoading || func2?.isLoading) return
    if (isAuth) {
      try {
        if (bool) {
          await func1.mutateAsync(name)
        } else {
          await func2.mutateAsync(name)
        }
      } catch (error) {
        console.log('followFavoriteErr: ', error)
      }
    } else {
      navigate('/register')
    }
  }

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article?.title}</h1>

          <div className='article-meta'>
            <a href=''>
              <img src={article?.author?.image} />
            </a>
            <div className='info'>
              <a href='' className='author'>
                {article?.author?.username}
              </a>
              <span className='date'>{dateConverter(article?.updatedAt)}</span>
            </div>
            <button
              className='btn btn-sm btn-outline-secondary'
              onClick={() =>
                handleFunc(
                  article?.author?.username,
                  isFollowing,
                  unfollow,
                  follow
                )
              }
            >
              <i className='ion-plus-round'></i>
              &nbsp; {isFollowing ? 'Unfollow' : 'Follow'}{' '}
              {article?.author?.username}
            </button>
            &nbsp;&nbsp;
            <button
              className='btn btn-sm btn-outline-primary'
              onClick={() =>
                handleFunc(article?.slug, isFavorite, unfavorite, favorite)
              }
            >
              <i className='ion-heart'></i>
              &nbsp; {isFavorite ? 'Unfavorite' : 'Favorite'} Article{' '}
              <span className='counter'>{article?.favoritesCount}</span>
            </button>
          </div>
        </div>
      </div>

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            <p>{article?.description}</p>
          </div>
        </div>

        <ul className='tag-list'>
          {article?.tagList &&
            article?.tagList.map((tag: string) => (
              <li className='tag-default tag-pill tag-outline ng-binding ng-scope'>
                {tag}
              </li>
            ))}
        </ul>

        <hr />

        <ArticleActions
          article={article}
          handleFunc={handleFunc}
          dateConverter={dateConverter}
          isFollowing={isFollowing}
          unfollow={unfollow}
          follow={follow}
          isFavorite={isFavorite}
          unfavorite={unfavorite}
          favorite={favorite}
        />

        <Comments slug={slug} isAuth={isAuth} />
      </div>
    </div>
  )
}

export default Article
