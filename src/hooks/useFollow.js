import useAction from "./useActon"
import useAxiosPrivate from "./useAxiosPrivate"


const useFollow = () => {
    const axiosPrivate = useAxiosPrivate()
    const { setAction } = useAction()
    const handleFollow = async (userid) => {
        try {
            await axiosPrivate.post(`/user/${userid}/follow`).then(({ data }) => {
                setAction(prev => prev + 1)
            })

        } catch (error) {
            console.log(error)

        }
    }
    return handleFollow
}

export default useFollow