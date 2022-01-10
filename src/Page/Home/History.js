import React from 'react'
import Header from './Component/Header'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import ListHistory from './Component/History/ListHistory'
import './home.css'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from 'axios'


const History = () => {
    const [data, setData] = useState({
        data : []
    })
    const user = JSON.parse(localStorage.getItem('user'))

    
    
    useEffect(() => {
        axios.get(`https://zwallet-ridho.herokuapp.com/user/${user.user_id}/transaction/history`)
        .then((res) => {
            // console.log(res.data.data)
            setData({
                data : res.data.data
            })
            // console.log(data)
        })
        .catch((err) => {
            console.log(err.response)
        })       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='home d-flex flex-column justify-content-center align-items-center'>
            <Header />
            <div className="main-content w-75 d-flex justify-content-between align-items-center" >
                <Navbar />
                <div className='dashboard d-flex justify-content-center bg-light border1 ms-3'>
                <ListHistory data={data.data}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default History