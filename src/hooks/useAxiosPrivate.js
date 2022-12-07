import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import useAuth from "./useAuth";
const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { user } = useAuth()
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log('request sent', config)
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user.accessToken}`;
                }

                return config
            }, (error) => {
                Promise.reject(error)
            }
        )
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                console.log('response got')
                return response
            },
            async (error) => {
                console.log(error)
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.send) {
                    prevRequest.send = true;
                    const newAccessToken = await refresh();
                    console.log(newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);

                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    }, [refresh, user])
    return axiosPrivate;
}

export default useAxiosPrivate