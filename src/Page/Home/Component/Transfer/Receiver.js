import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react/cjs/react.development'
import { useParams , useNavigate} from 'react-router-dom'

const Receiver = (props) => {
    const [receiver, setReceiver] = useState({
        name : '',
        phone : '',
        id : ''
    })
    
    useEffect(()=>{
        axios.get(`https://zwallet-ridho.herokuapp.com/user/${props.id}`)
        .then(res => {
            setReceiver({
                name : res.data[0].Name,
                phone : res.data[0].phone,
                id : res.data[0].user_id
            })
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    
    return (
        <div className="user d-flex  align-items-center">
            <img src="https://i.pinimg.com/236x/7f/39/f0/7f39f0ad4dd6b777ab72bc7dc3b91958.jpg" alt="" width="50px" height="50px" className="mb-1 ms-3" />
            <div className="name-info pe-1 ms-4 pt-3">
                <h6>{receiver.name} ({receiver.id})</h6>
                <p>{receiver.phone}</p>
            </div>
            <div className="flex-fill"></div>
        </div>
    )
}

export default Receiver