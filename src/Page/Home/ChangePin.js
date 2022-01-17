import React from 'react'
import Header from './Component/Header'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import ChangePinChild from './Component/Profile/ChangePinChild'
import './home.css'


const ChangePin = () => {
    return (
        <div className='home d-flex flex-column justify-content-center align-items-center'>
            <Header/>
            <div className="main-content w-75 d-flex justify-content-between align-items-center" >
                <Navbar />
                <div className='dashboard d-flex justify-content-center bg-light border1 ms-3'>
                <ChangePinChild/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChangePin