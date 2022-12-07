
import React, { useContext } from 'react'


import { ActionContext } from '../../context/ActionContext'

import Post from '../post/Post'

import './Posts.scss'
const Posts = ({ posts }) => {
    const { action, setAction } = useContext(ActionContext)


    return (
        <div className='posts'>
            {posts.map(post => (
                <Post post={post} key={post?._id} action={setAction} />
            )).reverse()}
        </div>
    )
}

export default Posts