import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify'
import AxiosService from '../utils/ApiService';
import {useNavigate } from 'react-router-dom';

function ForgotPassword() {
  let [email,setEmail] = useState("")
  let navigate = useNavigate()
  let handleForgot = async()=>{
    try {
      let res = await AxiosService.post(`/user/forgot-password`,{
        email,
      })
      if(res.status===200)
      {
        toast.success(res.data.message)
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('userData',JSON.stringify(res.data.userData))
        
        if(res.data.userData.role === 200)
        {
            navigate('/signin')
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  } 
  return <>
  <div className='background-container'>
    <h1 style={{textAlign:"center"}}>Forgot Password</h1>
  <Form className='label'>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" onClick={handleForgot}>
        send
      </Button>
      
    </Form>
  </div>
  </>
}

export default ForgotPassword  



