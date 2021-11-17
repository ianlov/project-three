import { useState } from 'react'
import './SignUp.css'
import { signUp } from '../../services/users'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const history = useHistory()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isError: false,
    errorMsg: '',
  })

  const handleChange = (event) =>
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })

  const onSignUp = async (event) => {
    event.preventDefault()
    const { setUser } = props
    try {
      const user = await signUp(form)
      setUser(user)
      history.push('/')
    } catch (error) {
      console.error(error)
      setForm({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        isError: true,
        errorMsg: 'Sign Up Details Invalid',
      })
    }
  }

  const renderError = () => {
    const toggleForm = form.isError ? 'danger' : ''
    if (form.isError) {
      return (
        <button className="btn__4" type='submit' className={toggleForm}>
          {form.errorMsg}
        </button>
      )
    } else {
      return <button className="btn__4" type='submit'>Create New Account</button>
    }
  }

  const { username, email, password, passwordConfirmation } = form
  
  return (
<>
  <div className="box">
    <section className="container__2">
      <div className="header">Sign Up</div>
          <form className="form" onSubmit={onSignUp}>

              <label className="text__signup__1">Create Username</label>
                <input
                  required
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={handleChange}
              />
              <label className="text__signup__2">Email address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={handleChange}
            />

              <label className="text__signup__2">Password</label>
                <input
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
              />
              
              <label className="text__signup__3">Password Confirmation</label>
                <input
                  required
                  name='passwordConfirmation'
                  value={passwordConfirmation}
                  type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange}
            />
                    {renderError()}
          </form>

            <div>
              <button className="btn__4" type="submit">Create New Account</button>
            </div>
          
    </section> 
  </div>
</>
  )
}

export default SignUp