import React from 'react'
import Post from '../post/Post'

import './Posts.scss'
const Posts = () => {

    const data = [{
        id: 1,
        userId: 1,
        name: 'jhon doe',
        profilePic: 'https://images.pexels.com/photos/13835274/pexels-photo-13835274.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
        desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'https://images.pexels.com/photos/13313434/pexels-photo-13313434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, {
        id: 2,
        userId: 2,
        name: 'Rizky',
        profilePic: 'https://images.pexels.com/photos/13984633/pexels-photo-13984633.jpeg',
        desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
        img: 'https://images.pexels.com/photos/5435307/pexels-photo-5435307.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
    }]
    return (
        <div className='posts'>
            {data.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Posts