import { SubmitHandler, useForm } from 'react-hook-form'
import useUserAuth from '../../../hooks/useUserAuth'
import FieldInput from '../../../components/Inputs/FieldInput'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import fieldObjs from './registerData'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
  user: {
    username: string
    email: string
    password: string
  }
}
const Register = () => {
  const { registerUser, registerErr } = useUserAuth()
  const data = useSelector((state: RootState) => state.userAuth)
  console.log('data: ', data)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    defaultValues: {
      user: {
        username: '',
        email: '',
        password: ''
      }
    },
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerUser.mutateAsync(data, {
      onSuccess: () => {
        reset()
        navigate('/')
      },
      onError: (err) => {
        console.error('submitErr: ', err)
      }
    })
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign up</h1>
            <p className='text-xs-center'>
              <Link to='/login'>Have an account?</Link>
            </p>

            <ul className='error-messages'>
              {errors.user &&
                Object.keys(errors.user as Record<string, any>).map((key) => (
                  <li key={key}>
                    {(errors.user as Record<string, any>)[key].message}
                  </li>
                ))}
              {registerUser.isError &&
                registerErr &&
                Object.keys(registerErr).map((errKey: string) =>
                  (registerErr[errKey] as string[]).map(
                    (errMsg: string, i: number) => (
                      <li key={`${errKey}-${i}`}>{`${errKey}: ${errMsg}`}</li>
                    )
                  )
                )}
            </ul>

            <form onSubmit={handleSubmit(onSubmit)}>
              {fieldObjs.map((fieldObj: any) => (
                <FieldInput {...fieldObj} register={register} />
              ))}
              <button
                className='btn btn-lg btn-primary pull-xs-right'
                disabled={registerUser.isLoading}
              >
                {registerUser.isLoading ? 'Loading...' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
