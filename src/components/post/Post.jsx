import { Link } from 'react-router-dom'
import './post.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../comments/Comments';
import { useState } from 'react';


const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false)
    const liked = false;
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: 'inherit' }}>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <span className='date'>1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon />}
                        12 Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(e => !e)}>
                        <MessageIcon />
                        12 Comments
                    </div>
                    <div className="item">
                        <ShareIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments />}


            </div>
        </div>
    )
}

export default Post