import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Register = () => {
  return (
    <div className='min-h-screen w-auto flex flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50'>
        <div className='flex flex-col border-double w-2/5 py-20 self-center'>
                <div className='mb-6'>
                    <h1 className='text-5xl text-center font-bold mb-4'>Register</h1>
                </div>
                <div className='flex flex-col justify-center self-center w-4/6'>
                  <div className='flex flex-col self-center gap-6 w-4/7'>
                    <TextField id="name" label="Full Name" variant="outlined"/>
                    <TextField id="email" label="Email Address" variant="outlined" />
                    <TextField id="password" label="Password" variant="outlined" />
                    <TextField id="confirm" label="Confirm Password" variant="outlined" />
                    <Button variant="contained"><span className='py-1 normal-case text-2xl'>Create Account</span></Button>
                    <h6 className='text-center text-xs'>By signing up, you agree to the <b>Terms of Service</b> and <b>Privacy Policy</b></h6>
                  </div>
                </div>
            </div>
    </div>
  )
}

export default Register