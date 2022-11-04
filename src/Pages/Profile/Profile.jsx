import './Profile.scss';
import Posts from '../../components/posts/Posts'
import { FacebookTwoTone, LinkedIn, Instagram, Pinterest, Twitter, Place, Language, EmailOutlined, MoreVert } from '@mui/icons-material'
const Profile = () => {
    return (
        <div className="profile">
            <div className="images">
                <img src="https://images.pexels.com/photos/5422695/pexels-photo-5422695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='cover' />
                <img src="https://images.pexels.com/photos/5589911/pexels-photo-5589911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='profilePic' />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="">
                            <FacebookTwoTone />
                        </a>
                        <a href="">
                            <Instagram />
                        </a>
                        <a href="">
                            <Twitter />
                        </a>
                        <a href="">
                            <LinkedIn />
                        </a>
                        <a href="">
                            <Pinterest />
                        </a>
                    </div>
                    <div className="center">
                        <span>
                            Jhon
                        </span>
                        <div className="info">
                            <div className="item">
                                <Place />
                                <span>USA</span>
                            </div>
                            <div className="item">
                                <Language />
                                <span>EN</span>
                            </div>


                        </div>
                        <button>Follow</button>
                    </div>
                    <div className="right">
                        <EmailOutlined />
                        <MoreVert />
                    </div>
                </div>
                <Posts />
            </div>


        </div>
    )
}

export default Profile