import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import AxiosService from '../utils/ApiService';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  const [newpassword, setNewpassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleResetPassword = async () => {
    try {
      const token = new URLSearchParams(location.search).get('token');

      if (!token) {
        toast.error('Invalid token');
        return;
      }

      if (newpassword !== confirmpassword) {
        toast.error("Passwords don't match");
        return;
      }

      const res = await AxiosService.post(
        `/user/reset-password`,
        {
          newpassword,
          confirmpassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <>
      <div className='background-container'>
        <h1 style={{ textAlign: 'center' }}>Reset Password</h1>
        <Form className='label'>
          <Form.Group className='mb-3'>
            <Form.Label>New password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              onChange={(e) => setNewpassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter confirm Password'
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' onClick={handleResetPassword}>
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ResetPassword;
