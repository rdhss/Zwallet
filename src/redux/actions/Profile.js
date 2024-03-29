import { axiosInstance } from "../../Page/Helper/axios"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react-hooks/rules-of-hooks

const token = localStorage.getItem('token')

export const GetProfileRequest = ()=> {
    return {
        type: 'GET_PROFILE_REQUEST'
    }
}
export const GetProfileSuccess = (data)=> {
    return {
        type: 'GET_PROFILE_SUCCESS',
        payload: data
    }
}

export const GetProfileFail = (error)=> {
    return {
        type: 'GET_PROFILE_FAIL',
        payload: error
    }
}

export const PutProfile = (data)=> {
    return {
        type: 'PUT_PROFILE_SUCCESS',
        payload: data
    }
}


export const GetProfile = (token1)=> {
    return (dispatch) => {
        dispatch(GetProfileRequest())
        return axiosInstance.get(`/user/`,{
            headers: {
              'Authorization': `Bearer ${token1}` 
            }
          }).then((res)=> {
           const data =  res.data?.data
           dispatch(GetProfileSuccess(data))
        }).catch((err)=>{
            dispatch(GetProfileSuccess([{phone : 628333166444, Name : 'John Doe', Email : 'demo@gmail.com'}]))
            const message =  err.message
            dispatch(GetProfileFail(message))
        })
    }
}

export const changeProfile = (data, token1) => {
    return (dispatch) => {
        return axiosInstance.put(`/user/profile`, data, {
            headers: {
                'Authorization': `Bearer ${token1}`
            }
        })
        .then((res)=>{
            const result = res.data?.data.message
            dispatch(PutProfile(result))
            
        }).then((res)=>{
            dispatch(GetProfile(token1))
        }).catch((err)=>{
            const message =  err.message
            console.log(message)
        })
    }
}
            
