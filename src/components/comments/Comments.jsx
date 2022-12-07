import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { ActionContext } from '../../context/ActionContext'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './Comments.scss'

const Comments = ({ postid }) => {
    const [comments, setComments] = useState([])
    const [comment, setcomment] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const { setUser } = useAuth()
    const { action, setAction } = useContext(ActionContext)
    useEffect(() => {
        // eslint-disable-next-line
        let isMounted = true;
        const controller = new AbortController();
        const getAllComments = async () => {
            try {
                await axiosPrivate.get(`post/${postid}/comments`).then(({ data }) => {
                    console.log(data)
                    setComments(data.comments)
                    console.log(comments)
                })
            } catch (error) {
                console.log(error.response)
                if (error.response.status === 403) return setUser(null)
            }
        }
        getAllComments()
        return () => {
            isMounted = false;
            controller.abort();
        }
        // eslint-disable-next-line
    }, [action])
    const handleComment = async () => {
        try {
            await axiosPrivate.post(`/post/${postid}/comments`, { comment }).then(e => {
                console.log(e.data)
                setcomment('')
                setAction(prev => prev + 1)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        if (e.keyCode === 13) {
            console.log(e.keyCode)
            if (comment === '') return
            handleComment()
        }
        setcomment(e.target.value)
    }
    return (
        <div className="comments">
            <div className="write">
                <img src="https://images.pexels.com/photos/13984633/pexels-photo-13984633.jpeg" alt="" />
                <input type="text" name="" id="" value={comment} onChange={(e) => handleChange(e)} placeholder='write a comment' onKeyDown={(e) => handleChange(e)} />
                <button onClick={handleComment}>Send</button>

            </div>
            {comments.map(e => (
                <div className="comment" key={e._id}>
                    <img src={e.userid.profilePic} alt="" />
                    <div className="info">
                        <span>{e.userid.name}</span>
                        <p>{e.comment}</p>
                    </div>
                    <span className='date'>1 hour ago</span>
                </div>
            ))}
        </div>

    )
}

export default Comments