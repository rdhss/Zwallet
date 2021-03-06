import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const [dashboard, setDashboard] = useState({
        icon : 'nav1',
        border: 'navBorderOff',
        text: 'navLinkOn'
    })

    const handleClick = () => {
       localStorage.clear()
    }
    let onpage
    

    return (
        <div className="d-md-block d-none border1 navSize bg-light d-flex justify-content-center">
            <aside className='w-100 h-100'>
                <nav className="h-75 w-100 d-flex flex-column  mt-5">
                    <div className={`${props.dashboard === 'on' ? 'nav1On' : 'nav1'} ${props.dashboard === 'on' ? 'navBorderOn' : 'navBorderOff'} h-15 w-100 d-flex align-items-center justify-content-center`}><h5 className="ms-4 w-30"><Link className={`${props.dashboard  === 'on' ? 'navLinkOn' : 'navLink'}`} to='/'>Dashboard</Link></h5></div>
                    <div className={`${props.transfer === 'on' ? 'nav2On' : 'nav2'} ${props.transfer === 'on' ? 'navBorderOn' : 'navBorderOff'} h-15 w-100 d-flex align-items-center justify-content-center`}><h5 className="ms-4 w-30"><Link className={`${props.transfer  === 'on' ? 'navLinkOn' : 'navLink'}`} to='/transfer'>Transfer</Link></h5></div>
                    <div className={`nav3 navBorderOff h-15 w-100 d-flex align-items-center justify-content-center`}><h5 className="ms-4 w-30">Top Up</h5></div>
                    <div className={`${props.profile === 'on' ? 'nav4On' : 'nav4'}  ${props.profile === 'on' ? 'navBorderOn' : 'navBorderOff'} h-15 w-100 d-flex align-items-center justify-content-center`}><h5 className="ms-4 w-30"><Link className={`${props.profile  === 'on' ? 'navLinkOn' : 'navLink'}`} to='/profile'>Profile</Link></h5></div>
                    <div className="flex-fill"></div>
                    <div className="nav5 navBorderOff h-15 w-100 d-flex align-items-center justify-content-center"><h5 className="ms-4 w-30"><Link onClick={handleClick} className='navLink' to='/login'>Log Out</Link></h5></div>
                </nav>
            </aside>
        </div>
    )
}

export default Navbar
