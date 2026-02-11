import { NavLink } from 'react-router-dom'
import '../styles/Signup.css'

function Signup() {
  return (
    <div className='signup-container'>
      <p className="title">Create an Account</p>
      
      <form className='signup-form'>
        <div className='form-group'>
          <label htmlFor='username'>Username or Email</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter your username or email'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Confirm your password'
            required
          />
        </div>
        <button type='submit' className='signup-button'>Sign Up</button>
      </form>
      <p className='dont-have'>Have an account?{'  '}
      <NavLink to='/login' className='login-link'>Log in</NavLink></p>
    </div>
  )
}

export default Signup
