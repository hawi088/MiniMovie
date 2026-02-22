import { NavLink, useNavigate } from 'react-router-dom'
import React,{useState} from 'react'
import '../styles/Login.css'


function Login() {
  const [UsernameOrEmail , setUsernameOrEmail] = useState('')
  const [password , setPassword]  = useState('')
  const [error , setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:5000/api/auth/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({email:UsernameOrEmail , password})
      })
      const data = await res.json()
      if(data.success) navigate('/profile')
      else{
    setError('Login failed. Please try again')}
    }catch(err){
      console.error(err)
      setError('Login failed.  try again')
    }
  }
  return (
    <div className='login-container'>
      <p className="title">Welcome Back!</p>
      
      <form className='login-form' onSubmit={handleSubmit}>
        {error && <p style={{color:'red'}}>{error}</p>}
        <div className='form-group'>
          <label htmlFor='username'>Username or Email</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter your username or email'
            value = {UsernameOrEmail}
            onChange={(e)=>setUsernameOrEmail(e.target.value)}
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
        <button type='submit' className='login-button'>Login</button>
      </form>
      <p className='dont-have'>Don't have an account?{'  '}
      <NavLink to='/signup' className='signup-link'>Sign Up</NavLink></p>
    </div>
  )
}

export default Login
