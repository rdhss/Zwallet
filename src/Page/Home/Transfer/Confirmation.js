import React from 'react'
import Header from '../Component/Header'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import Detail from '../Component/Transfer/Detail'
import PinPopUp from '../../../Component/pinconfirm/PinPopUp'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { detailTransaction } from '../../Helper/home'
import { processTransfer } from '../../Helper/home'
import { useSelector } from 'react-redux'
import socket from '../../Helper/socket'
import { profileId } from '../../Helper/home'




const Confirmation = () => {
    const { data } = useSelector((state) => state.balance)
    const profile = useSelector((state)=> state.profile)
    const token = localStorage.getItem('token')
    const [test, setTest] = useState('')
    const [receiver, setReceiver] = useState({
        name: '',
        phone: '',
        photo: '',

    })
    const [detail, setDetail] = useState({
        amount : '',
        balance: '',
        date : '',
        message:'',
        popup: false
    })

    const [pin, setPin] = useState({
        popup: false,
        pin1 : '',
        pin2: '',
        pin3: '',
        pin4: '',
        pin5: '',
        pin7: ''
    })

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        profileId(params.id, token)
            .then(res => {
                console.log(res.data.data[0])
                setReceiver({
                    name: res.data.data[0].Name,
                    phone: res.data.data[0].phone,
                    photo: res.data.data[0].photo
                })
            })
            .catch(err => {
                console.log(err)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        detailTransaction(params.invoice)
        .then((res)=>{
            setTest(res.data.data[0])
            setDetail({
                amount : res.data.data[0].amount,
                balance : data[0].balance - Number(res.data.data[0].amount),
                date : new Date(res.data.data[0].date).toString(),
                message: res.data.data[0].message,
                popup : false
            })
        })
        .catch((err)=> {
            console.log(err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChangePin = (e) => {
        setPin({
            ...pin,
            [e.target.name] :  e.target.value
        })
    }

    

    const handleClick = () => {
        socket.emit('sendMoney', {
            sender: test.id_sender,
            receiver: test.receiver,
            amount: test.amount,
            invoice: test.invoice,
            photo: profile.data[0].photo,
            date: new Date()
        })
        
        setDetail({
            ...detail,
            popup : true
        })
    }
    const handleClickPin = (e) => {
        e.preventDefault()
        let pinConfirm = Number(pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin7)

        socket.emit('sendMoney', {
            sender: test.id_sender,
            receiver: test.receiver,
            amount: test.amount,
            invoice: test.invoice,
            photo: profile.data[0].photo,
            date: new Date()
        })
        processTransfer(params.invoice, {
            pin : pinConfirm
        })
        .then((res) => {
            navigate(`/transfer/${params.id}/${params.invoice}/success`)
        })
        .catch((err) => {
            console.log()
            alert(err.response.data.message)
        })
    }

    return (
        <div className='home d-flex flex-column justify-content-center align-items-center'>
            <Header />
            {detail.popup && <PinPopUp change={handleChangePin} click={handleClickPin}/>}
            <div className="main-content w-75 d-flex justify-content-between align-items-center" >
                <Navbar transfer='on'/>
                <div className='dashboard overflow-scroll d-flex justify-content-center bg-light border1 ms-3'>
                <Detail name={receiver.name} phone={receiver.phone} image={receiver.photo} id={params.id} click={handleClick} amount={detail.amount} left={detail.balance} message={detail.message} date={detail.date}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Confirmation
