export const fetchUserProfile = async()=>{
    const res = await fetch('http://localhost:5000/api/auth/profile',{
        method:"GET",
        credentials:'include'
    })
    return await res.json()
}
export const getUserActivity = async()=>{
    const res = await fetch('http://localhost:5000/api/auth/profile/activity',{
        method:"GET",
        credentials:"include"
    })
    return res.json()
}