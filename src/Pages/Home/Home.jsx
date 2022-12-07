
import { useContext, useEffect, useState } from 'react'
import Posts from '../../components/posts/Posts'
import Stories from '../../components/stories/Stories'
import './Home.scss'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { ActionContext } from '../../context/ActionContext'

const Home = () => {
    const { action } = useContext(ActionContext)
    const axiosPrivate = useAxiosPrivate()
    const { setUser } = useAuth()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/post', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPosts(response.data);
            } catch (error) {
                console.error(error);
                console.log(error?.response)
                if (error?.response?.status === 403) return setUser(null)
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
        // eslint-disable-next-line
    }, [action])

    return (

        <div className='home'>
            <Stories />
            <Posts posts={posts} />
        </div >

    )
}

export default Home