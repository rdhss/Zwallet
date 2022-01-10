import React from 'react'
import Header from '../Component/Header'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import ListUser from '../Component/Transfer/ListUser'
import { useEffect, useState } from 'react/cjs/react.development'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SearchUser = () => {
   const [data, setData] = useState({
       data : []
   })

   const navigate = useNavigate()

    useEffect(()=>{
        axios.get('https://zwallet-ridho.herokuapp.com/admin/users-list')
        .then((res) => {
            console.log(res)
            setData({
              data : res.data.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const handleClick = (e) => {
        console.log(e)
        navigate(`/transfer/${e.target.id}`)
    }

    return (
        <div className='home d-flex flex-column justify-content-center align-items-center'>
            <Header />
            <div className="main-content w-75 d-flex justify-content-between align-items-center" >
                <Navbar />
                <div className='dashboard d-flex justify-content-center bg-light border1 ms-3'>
                    <ListUser data={data.data} event={handleClick}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchUser