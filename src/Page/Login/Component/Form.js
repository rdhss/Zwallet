import React, { useState } from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const Form = () => {
    const [form, setForm] = useState({
        email : '',
        password : ''
    })
    const navigate = useNavigate()
    const [errorMsg, seterrorMsg] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://zwallet-ridho.herokuapp.com/user/${form.email}/balance`)
        .then((res) => {
            localStorage.setItem('balance', res.data.data[0].balance)
        })
        .then((err) => {
            console.log(err)
        })

        axios.post('https://zwallet-ridho.herokuapp.com/auth/login', 
        {
            id: form.email,
            password:  form.password
        })
        .then((res) => {
            const result = res.data.data[0]
            console.log(result)
            localStorage.setItem('auth', 1)
            localStorage.setItem('user', JSON.stringify(result))
            alert(res.data.message)
            navigate('/')
        })
        .catch((err) => {   
            console.log(err)
            seterrorMsg(err.response.data.message)
        })
    }

    return (
        <Fragment>
        <form className="h-55 d-flex flex-column mt-5" onSubmit={handleSubmit}>
            <div className="input-login w-100 h-30 d-flex flex-column justify-content-between" >
                <input 
                type="text" 
                placeholder="Enter your e-mail" 
                className="email w-100 "
                name='email'
                onChange={handleChange}
                 />
                <input 
                type="password" 
                placeholder="Enter your password" 
                className="password w-100 mt-5"
                name='password' 
                onChange={handleChange}
                />
                {errorMsg && <p className='text-danger pt-2'>{errorMsg}</p>}
            </div>
            <Link to='/login' className="text-end mt-4 flex-fill">Forgot password?</Link>
            <button className='btn-login mt-5'>Login</button>
            <p className="text-center mt-4">Don’t have an account? Let’s <Link to='/register'>Sign up</Link></p>
        </form>
        </Fragment>
    )
}

export default Form