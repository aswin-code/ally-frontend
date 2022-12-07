import { axiosMutation } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import useAuth from "./useAuth";
const useMutation = () => {
    const refresh = useRefreshToken()
    const { user } = useAuth()
    useEffect(() => {
        const requestIntercept = axiosMutation.interceptors.request.use(
            config => {

                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user.accessToken}`;
                }

                return config
            }, (error) => {
                Promise.reject(error)
            }
        )

        const responseIntercept = axiosMutation.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.send) {
                    prevRequest.send = true;
                    const newAccessToken = await refresh();
                    console.log(newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosMutation(prevRequest);

                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosMutation.interceptors.response.eject(responseIntercept)
            axiosMutation.interceptors.request.eject(requestIntercept)
        }


    }, [refresh, user])
    return axiosMutation;
}

export default useMutation