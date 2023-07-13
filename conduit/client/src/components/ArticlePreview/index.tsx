import { Link } from 'react-router-dom'

const ArticlePreview = (props: any) => {
  const {
    author,
    updatedAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title
  } = props
  console.log('author: ', tagList)

  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to='/profile'>
          <img src={author?.image} />
        </Link>
        <div className='info'>
          <a href='' className='author'>
            {author?.username}
          </a>
          <span className='date'>{updatedAt}</span>
        </div>
        <button className='btn btn-outline-primary btn-sm pull-xs-right'>
          {favorited && <i className='ion-heart'></i>} {favoritesCount}
        </button>
      </div>
      <a href='' className='preview-link'>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul className='tag-list'>
          {tagList &&
            tagList.map((tag: string) => (
              <li className='tag-default tag-pill tag-outline ng-binding ng-scope'>
                {tag}
              </li>
            ))}
        </ul>
      </a>
    </div>
  )
}

export default ArticlePreview
