import './Profile.scss';
import Posts from '../../components/posts/Posts'
import { FacebookTwoTone, LinkedIn, Instagram, Pinterest, Twitter, Place, Language, EmailOutlined, MoreVert } from '@mui/icons-material'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import useFollow from '../../hooks/useFollow'
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ActionContext } from '../../context/ActionContext';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import useAxiosMutation from '../../hooks/useMutation'
import { toast } from 'react-toastify';
const Profile = () => {
    const location = useLocation()
    const axiosMutation = useAxiosMutation()
    console.log(location.state)
    const { user } = useAuth()
    const { action, setAction } = useContext(ActionContext)
    const axiosPrivate = useAxiosPrivate()
    const [users, setUsers] = useState({})
    const [posts, setPosts] = useState([])
    const handleFollow = useFollow()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPosts = async () => {
            try {
                const { data } = await axiosPrivate.get(`/user/${location.state}/post`, {
                    signal: controller.signal
                })
                isMounted && setPosts(data)

            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [location.state, action])
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUser = async () => {
            try {
                const { data } = await axiosPrivate.get(`/user/${location.state}`, {
                    signal: controller.signal
                })
                console.log(data)
                isMounted && setUsers(data)

            } catch (error) {
                console.log(error)
            }
        }
        getUser()
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [location.state, action])
    const handleUpload = async (e) => {
        try {

            const file = e.target.files[0]
            if (!file) return
            const form = new FormData()
            form.append('image', file)

            toast.warning('profile updating please wait')
            await axiosMutation.post('/profile', form).then(({ data }) => {
                console.log(data)
                setAction(prev => prev + 1)
                toast.dismiss()
                toast.success('profile updated')

            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="profile">
            <div className="images">
                <img src="https://images.pexels.com/photos/5422695/pexels-photo-5422695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='cover' />
                <div className='profilePic'>
                    {users._id == user.user._id ? <input type="file" id='upload' hidden onChange={(e) => handleUpload(e)} /> : null}
                    <label htmlFor="upload">
                        <img src={users.profilePic} alt="" className='' />
                    </label>
                </div>


            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="info">
                        <h3>{users.name}</h3>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    </div>
                    <div className="details">
                        <div className="lists">
                            <span>posts <b>{posts.length}</b></span>
                            <span>followers <b>{users.followers?.length}</b></span>
                            <span>following <b>{users.following?.length}</b></span>
                        </div>
                        {user.user._id == location.state ? null : <div className="btn">{user.user.following.find(e => e.follow == location.state) ? <button onClick={() => handleFollow(location.state)} style={{ backgroundColor: '#ff2d55' }}>unfollow</button> : <button onClick={() => handleFollow(location.state)}>Follow</button>} <button>Message</button></div>}
                    </div>
                </div>
                <Posts posts={posts} />
            </div>


        </div>
    )
}

export default Profile