import {NavLink} from 'react-router-dom'
import '../styles/Navbar.css'
function Navbar(){
    return(
    <nav className='navbar'>
        <div className='logo'>MiniMovie</div>
        <div className='nav-links'>
            <NavLink to='/' end>Home</NavLink>
            <NavLink to='/favorite'>Favorite</NavLink>
            <NavLink to ='/review'>Review</NavLink>
            <NavLink to='/watchlist'>WatchList</NavLink>
            <NavLink to ='/login'>Login</NavLink>
        </div>
    </nav>
    )
}
export default Navbar