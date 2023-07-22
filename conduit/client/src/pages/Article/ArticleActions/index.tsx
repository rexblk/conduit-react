const ArticleActions = ({
  article,
  handleFunc,
  dateConverter,
  isFollowing,
  unfollow,
  follow,
  isFavorite,
  unfavorite,
  favorite
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
            handleFunc(article?.author?.username, isFollowing, unfollow, follow)
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
            handleFunc(article?.slug, isFavorite, unfavorite, favorite)
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
