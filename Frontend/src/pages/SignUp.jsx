import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/Signup.css'
import { useState } from 'react'

function Signup() {
  const [username, setUsername] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const [error , setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      console.log({username,email,password})
      const res = await fetch('http://localhost:5000/api/auth/signup',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        credentials:'include',
        body:JSON.stringify({username,email,password})
      })
      const data = await res.json()
      if(data.success) navigate ('/login')
      else{
    setError('Sign up failed. Please try again')
    }
    }
    catch(err){
      console.error(err)
      setError('Sign up failed. Try again later')
    }
  }

  return (
    <div className='signup-container'>
      <p className="title">Create an Account</p>
      
      <form className='signup-form' onSubmit={handleSubmit}>
      {error && <p style={{color:'red'}}>{error}</p>}
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter your username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            id='confirm-password'
            name='confirm-password'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
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
