import Article from '../pages/Article'
import CreateArticle from '../pages/Article/CreateArticle'
import EditArticle from '../pages/Article/EditArticle'

const articleRoutes = [
  {
    path: 'editor',
    element: <CreateArticle />,
    children: [
      {
        path: ':slug',
        element: <EditArticle />
      }
    ]
  },
  {
    path: 'article/:slug',
    element: <Article />
  }
]

export default articleRoutes
