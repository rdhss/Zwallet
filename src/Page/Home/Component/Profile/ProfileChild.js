import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../../../Home/home.css'
import '../../../style/dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile, GetProfile } from '../../../../redux/actions/Profile'
import test from '../../../../assets/images/photo2.png'


const ProfileChild = () => {
    const [form, setForm] = useState({
        photo: '',
        name: '',
    })
    const { data } = useSelector((state) => state.profile)
    let phone
    if(data[0].phone === 1){
        phone = <p style={{ color: '#7A7886' }} className='mt-0'>not registered</p>
    } else{
        phone = <p style={{ color: '#7A7886' }} className='mt-0'>+62{data[0].phone}</p>
    }

    
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleUpload = (e) => {
        setForm({
            ...form,
            photo: e.target.files[0]
        })
    }

    let token = localStorage.getItem('token')
    
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()

    const personalInfo = () => {
        navigate('/profile/info')
    }

    const handleClick = () => {
        setEdit(true)
    }
    useEffect(()=> {
        dispatch(GetProfile(token))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', form.photo)
        formData.append('name', form.name)


        dispatch(changeProfile(formData, token))
        .then((res)=>{
            console.log(data)
            setEdit(false)
        })
        }
        
        const changePin = () => {
            navigate('/profile/pin')
        }

        return (
            <div className='fade-up w-75 d-flex flex-column align-items-center'>

            {edit ?
                <form className='w-25 mt-3 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                    <img src='https://i.pinimg.com/236x/7f/39/f0/7f39f0ad4dd6b777ab72bc7dc3b91958.jpg' className='border1' width='52px' alt="" />
                    <div className='d-flex w-100 mt-3 me-5' >
                        <input type="file" name="photo" id="" className='position-absolute' onChange={handleUpload} />
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                        <input type="text" name='name' className='message2' onChange={handleChange} />
                        <button className='save'>save</button>
                    </div>
                </form>
                :
                <div className='w-25 mt-3 d-flex flex-column align-items-center'>
                    <img src={test} className='border1' width='52px' alt="" />
                    <div className='d-flex w-50 mt-3' onClick={handleClick}>
                        <img src="image/Vector.png" height="20px" alt="" />
                        <p style={{ color: '#7A7886' }} role='button' className='ps-2 cursor-pointer'>Edit</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h5 className="mt-2 h-25" style={{ color: "#3A3D42" }}>{data[0].Name}</h5>
                        <p style={{ color: '#7A7886' }}>{phone}</p>
                    </div>
                </div>
            }
            <div className='w-25 d-flex flex-column align-items-center'>
                <img src="image/profilenav1.png" className='' width='400px' style={{ cursor: 'pointer' }} alt="" onClick={personalInfo} />
                <img src="image/profilenav2.png" className='mt-3' width='400px' style={{ cursor: 'pointer' }} alt="" />
                <img src="image/profilenav3.png" className='mt-3' width='400px' style={{ cursor: 'pointer' }} alt="" onClick={changePin} />
                <img src="image/profilenav4.png" className='mt-3' width='400px' style={{ cursor: 'pointer' }} alt="" />
            </div>
        </div>
    )
}

export default ProfileChild
