import axios from 'axios'

export default axiosPublic=axios.create({
    baseUrl:process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials:true,
})