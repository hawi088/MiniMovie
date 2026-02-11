
import './App.css'
import {Routes , Route} from 'react-router-dom'
import Favorite from '../src/pages/Favorite'
import Review from '../src/pages/Review'
import WatchList from '../src/pages/WatchList'
import Login from '../src/pages/Login'
import Hero from '../src/components/Hero'
import Navbar  from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Signup from './pages/SignUp'

function App(){
  return(
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path ='/favorite' element={<Favorite />}></Route>
      <Route path ='/review' element={<Review />}></Route>
      <Route path = '/watchlist' element={<WatchList />}></Route>
      <Route path ='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>

    </Routes>
    </>
  
  )
}
export default App