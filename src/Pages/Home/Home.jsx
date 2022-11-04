import React from 'react'
import { useContext } from 'react'
import Posts from '../../components/posts/Posts'
import Stories from '../../components/stories/Stories'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import './Home.scss'
const Home = () => {
    const { user } = useContext(AuthContext)
    return (

        <div className='home'>
            {!user && <Navigate to="/login"></Navigate>}
            <Stories />
            <Posts />

        </div>

    )
}

export default Home