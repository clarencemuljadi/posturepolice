import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = () => {
  return (
    <div className='min-h-screen w-auto flex flex-col justify-center px-6 py-12 lg:px-8 bg-bground'>
        <div className='flex flex-col border-4 border-double rounded-lg px-10 h-full py-20 self-center'>
            <div className='flex flex-col self-center gap-6 w-4/7'>
              <h1 className='text-6xl text-center font-bold mb-10 px-0 py-0'>Register</h1>
              <TextField id="name" label="Full Name" variant="outlined"/>
              <TextField id="email" label="Email Address" variant="outlined" />
              <TextField id="password" label="Password" variant="outlined" />
              <TextField id="confirm" label="Confirm Password" variant="outlined" />
              <Button className="bg-button-color" variant="contained"><span className='py-1 normal-case text-2xl'>Create Account</span></Button>
              <h6 className='text-center text-xs'>By signing up, you agree to the <b>Terms of Service</b> and <b>Privacy Policy</b></h6>
            </div>
          </div>
    </div>
  )
}

export default Register