import '../styles/Login.css'

function Login() {
  return (
    <div className='login-container'>
      <p className="title">Welcome Back!</p>
      
      <form className='login-form'>
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
        <button type='submit' className='login-button'>Login</button>
      </form>
    </div>
  )
}

export default Login
