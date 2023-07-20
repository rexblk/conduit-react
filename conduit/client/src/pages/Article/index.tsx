import { Link, useParams } from 'react-router-dom'
import useArticle from '../../hooks/useArticle'
import dateConverter from '../../utils/dateConverter'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Comments from '../../components/Comments'
import useComment from '../../hooks/useComment'

const Article = () => {
  const { slug } = useParams()
  const { token } = useSelector((state: RootState) => state.userAuth)
  const isAuth = !!token
  const { article: articleData, isArticleLoading } = useArticle({ slug })
  const article = articleData?.article
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
            <button className='btn btn-sm btn-outline-secondary'>
              <i className='ion-plus-round'></i>
              &nbsp; Follow {article?.author?.username}
            </button>
            &nbsp;&nbsp;
            <button className='btn btn-sm btn-outline-primary'>
              <i className='ion-heart'></i>
              &nbsp; Favorite Post{' '}
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

        <div className='article-actions'>
          <div className='article-meta'>
            <a href='profile.html'>
              <img src={article?.author?.image} />
            </a>
            <div className='info'>
              <a href='' className='author'>
                {article?.author?.username}
              </a>
              <span className='date'>{dateConverter(article?.updatedAt)}</span>
            </div>
            <button className='btn btn-sm btn-outline-secondary'>
              <i className='ion-plus-round'></i>
              &nbsp; Follow {article?.author?.username}
            </button>
            &nbsp;
            <button className='btn btn-sm btn-outline-primary'>
              <i className='ion-heart'></i>
              &nbsp; Favorite Article{' '}
              <span className='counter'>{article?.favoritesCount}</span>
            </button>
          </div>
        </div>

        {isAuth ? (
          <Comments slug={slug}/>
        ) : (
          <div className='row'>
            <div className='col-xs-12 col-md-8 offset-md-2'>
              <p>
                <Link to='/login'>Sign in</Link> or{' '}
                <Link to='/register'>Sign up</Link> to add comments on this
                article.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article
