import { useEffect } from 'react'
import './RightBar.scss'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useState } from 'react'
import useAction from '../../hooks/useActon'
import useFollow from '../../hooks/useFollow'
import { useNavigate } from 'react-router-dom'
const RightBar = () => {
    const navigate = useNavigate()
    const [suggestions, setSuggestions] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const { action, setAction } = useAction()
    useEffect(() => {
        const fetchUsers = async () => {
            await axiosPrivate.get('/user').then(({ data }) => {
                setSuggestions(data)
            })
        }
        fetchUsers()
    }, [action])
    const handleFollow = useFollow()
    const handleNavigate = (e) => {
        navigate(`/profile/${e}`, { state: e })
        setAction(prev => prev + 1)
    }
    return (
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    {suggestions.map((e) => (
                        <div className="user" key={e._id}>
                            <div className="userInfo" onClick={() => handleNavigate(e._id)}>
                                <img src={e?.profilePic || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
                                <span>{e.name}</span>
                            </div>
                            <div className="buttons">
                                <button onClick={() => handleFollow(e._id)}>follow</button>
                                <button>dismiss</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="item">
                    <span> Latest Activites</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <p><span>Jhon</span> Changed their cover picture</p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div className="online" />
                            <span>Jhon</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default RightBar