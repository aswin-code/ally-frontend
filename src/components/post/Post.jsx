import { Link } from 'react-router-dom'
import './post.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../comments/Comments';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { IconButton } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const Post = ({ post, action }) => {
    const axiosprivate = useAxiosPrivate()
    const { user } = useAuth()
    const handleLike = async (e) => {

        await axiosprivate.get(`/post/${e}/likes`).then((res) => {
            action(prev => prev + 1)
        })
    }
    const [commentOpen, setCommentOpen] = useState(false)
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.userid?.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userid._id}`} state={post.userid._id} style={{ textDecoration: "none", color: 'inherit' }}>
                                <span className='name'>{post.userid?.name}</span>
                            </Link>
                            <span className='date'>1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{post.caption}</p>
                    <img src={post.image} alt="" loading='lazy' />
                </div>
                <div className="info">
                    <div className="item">
                        {post.Like.find(e => e === user.user._id) ? <IconButton sx={{ color: 'red' }} onClick={() => handleLike(post._id)}><FavoriteIcon /></IconButton> : <IconButton onClick={() => handleLike(post._id)}> <FavoriteBorderIcon /></IconButton>}
                        {post.Like.length} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(e => !e)}>
                        <MessageIcon />
                        Comments
                    </div>
                    <div className="item">
                        <ShareIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postid={post._id} />}


            </div>
        </div>
    )
}

export default Post