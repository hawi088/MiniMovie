import React, {useState , useEffect} from 'react'
import { fetchUserProfile , getUserActivity } from '../../services/userServices.js'
function Profile(){ 
    const [profile , setProfile] = useState(null)
    const [activity , setActivity] = useState(null)
    useEffect(()=>{
        const loadData = async()=>{
            const profileData = await fetchUserProfile()
            if(profileData.success) setProfile(profileData.profile)
            const activityData = await getUserActivity()
        if(activityData.success) setActivity(activityData)
        }
    loadData()
    },[])
    if(!profile || !activity) return <p>Loading .... </p>
    return (
<div>
 <h2>{profile.username}'s Profile</h2>
 <img src={profile.avatar || "/default-avatar.png"} alt="avatar" width={100} />
<p>Email: {profile.email}</p>
<p>Bio: {profile.bio || "No bio yet"}</p>

 <h3>Movie Activity</h3>
 <h4>Favorites:</h4>
 <ul>
 {activity.favorite.map(m => <li key={m._id}>Movie ID: {m.movieId}</li>)}
</ul>

 <h4>Watchlist:</h4>
 <ul>
 {activity.watchlist.map(m => <li key={m._id}>Movie ID: {m.movieId}</li>)}
 </ul>

 <h4>Ratings:</h4>
 <ul>
 {activity.rating.map(m => <li key={m._id}>Movie ID: {m.movieId} — Rating: {m.rating}</li>)}
 </ul>

 <h4>Reviews:</h4>
 <ul>
 {activity.reviews.map(m => <li key={m._id}>Movie ID: {m.movieId} — Review: {m.review}</li>)}
 </ul>
 </div>
 );
}
export default Profile