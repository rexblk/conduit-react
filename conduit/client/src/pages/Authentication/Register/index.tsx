import useUserAuth from '../../../hooks/useUserAuth'
import { useState } from 'react'

const Register = () => {
  const { register } = useUserAuth()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const hanldeSubmit = async (e: any) => {
    e.preventDefault()
    await register.mutateAsync({
      user: {
        username: userName,
        email,
        password
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
              <a href=''>Have an account?</a>
            </p>

            <ul className='error-messages'>
              <li>That email is already taken</li>
            </ul>

            <form onSubmit={hanldeSubmit}>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Your Name'
                  value={userName}
                  onChange={(e: any) => setUserName(e.target.value)}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </fieldset>
              <button className='btn btn-lg btn-primary pull-xs-right'>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
