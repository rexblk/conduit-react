import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ArticlePreview from '../../components/ArticlePreview'
import useArticle from '../../hooks/useArticle'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'

const Home = () => {
  const { token } = useSelector((state: RootState) => state.userAuth)
  const isAuth = !!token
  const [offset, setOffset] = useState(0)
  const [tag, setTag] = useState()
  const [active, setActive] = useState('global')

  const {
    articles,
    isArticlesLoading,
    isArticlesError,
    articlesError,
    tags,
    isTagsLoading
  } = useArticle({
    limit: 10,
    offset: offset,
    tag: tag
  })
  const articlesData = articles?.articles
  console.log('offset: ', active)
  const pageCount = Math.ceil(articles?.articlesCount / 10)
  const handlePageClick = (e: any) => {
    setOffset(e.selected * 10)
  }

  return (
    <div className='home-page'>
      {!isAuth && (
        <div className='banner'>
          <div className='container'>
            <h1 className='logo-font'>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}

      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                {isAuth && (
                  <li className='nav-item'>
                    <a className='nav-link disabled' href=''>
                      Your Feed
                    </a>
                  </li>
                )}
                <li className='nav-item'>
                  <a
                    className={`nav-link ${
                      active === 'global' ? 'active' : ''
                    }`}
                    onClick={() => setActive('global')}
                    href=''
                  >
                    Global Feed
                  </a>
                </li>
                {tag && (
                  <li className='nav-item'>
                    <a className={`nav-link ${active === tag ? 'active' : ''}`}>
                      <i className='ion-pound'></i>
                      {tag}
                    </a>
                  </li>
                )}
              </ul>
              {isArticlesLoading && (
                <p style={{ marginTop: '2rem' }}>Loading articles...</p>
              )}
            </div>

            {articlesData &&
              articlesData.map((article: any) => (
                <ArticlePreview {...article} />
              ))}
          </div>

          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>

              {isTagsLoading && <p>Loading tags...</p>}

              <div className='tag-list'>
                {tags &&
                  tags.map((tagItem: any) => (
                    <p
                      className='tag-pill tag-default'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setTag(tagItem)
                        setActive(tagItem)
                      }}
                    >
                      {tagItem}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <ReactPaginate
            breakLabel='...'
            nextLabel='next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='< previous'
            renderOnZeroPageCount={null}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination justify-content-center'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            activeClassName='active'
          />
        </div>
      </div>
    </div>
  )
}

export default Home
