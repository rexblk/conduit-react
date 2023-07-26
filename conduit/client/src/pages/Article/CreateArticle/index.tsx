import { SubmitHandler, useForm } from 'react-hook-form'
import FieldInput from '../../../components/Inputs/FieldInput'
import { articleObjs } from '../../Authentication/Login/loginData'
import { useNavigate } from 'react-router-dom'
import useArticle from '../../../hooks/useArticle'
import { useQueryClient } from 'react-query'

type Inputs = {
  article: {
    title: string
    description: string
    body: string
    tagList: any
  }
}

const CreateArticle = () => {
  const queryClient = useQueryClient()
  const { publishArticle } = useArticle({})
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('clicked: ', data)
    data.article.tagList = data.article.tagList.split(/\s+/)
    console.log('data: ', data)
    const res = await publishArticle.mutateAsync(data)
    console.log('publishRes: ', res)
    if (res?.article?.slug) {
      queryClient.invalidateQueries('get-articles')
      navigate(`/article/${res?.article?.slug}`)
    }
  }

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            <ul className='error-messages'>
              {errors.article &&
                Object.keys(errors.article as Record<string, any>).map(
                  (key) => (
                    <li key={key}>
                      {(errors.article as Record<string, any>)[key].message}
                    </li>
                  )
                )}
              {(publishArticle?.error as Record<string, any>) &&
                Object.keys(publishArticle?.error as Record<string, any>).map(
                  (errKey: string) =>
                    (
                      (publishArticle?.error as Record<string, any>)[
                        errKey
                      ] as string[]
                    ).map((errMsg: string, i: number) => (
                      <li key={`${errKey}-${i}`}>{`${errKey} ${errMsg}`}</li>
                    ))
                )}
            </ul>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                {articleObjs.map((articleObj: any, c: number) => (
                  <FieldInput
                    isLoading={publishArticle?.isLoading}
                    {...articleObj}
                    register={register}
                    key={c}
                  />
                ))}
                <button
                  className='btn btn-lg pull-xs-right btn-primary'
                  type='submit'
                  disabled={publishArticle?.isLoading}
                >
                  {publishArticle?.isLoading ? 'Loading...' : 'Publish Article'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateArticle
