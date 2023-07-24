import handleFollowFunc from '../../../utils/handleFollowFunc'

const ArticleActions = ({
  article,
  dateConverter,
  isFollowing,
  unfollow,
  follow,
  isFavorite,
  unfavorite,
  favorite,
  navigate,
  isAuth
}: any) => {
  return (
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
        <button
          className='btn btn-sm btn-outline-secondary'
          onClick={() =>
            handleFollowFunc(
              article?.author?.username,
              isFollowing,
              unfollow,
              follow,
              navigate,
              isAuth
            )
          }
        >
          <i className='ion-plus-round'></i>
          &nbsp; {isFollowing ? 'Unfollow' : 'Follow'}{' '}
          {article?.author?.username}
        </button>
        &nbsp;
        <button
          className='btn btn-sm btn-outline-primary'
          onClick={() =>
            handleFollowFunc(
              article?.slug,
              isFavorite,
              unfavorite,
              favorite,
              navigate,
              isAuth
            )
          }
        >
          <i className='ion-heart'></i>
          &nbsp; {isFavorite ? 'Unfavorite' : 'Favorite'} Article{' '}
          <span className='counter'>{article?.favoritesCount}</span>
        </button>
      </div>
    </div>
  )
}

export default ArticleActions
