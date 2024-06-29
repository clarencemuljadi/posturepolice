import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const textFieldStyle = { 
  width: '100%', 
  '.MuiInputBase-root': {
    height: '80px',
    borderRadius: '12px',
  },
  '.MuiOutlinedInput-input': {
    fontSize: '28px' 
  },
  '.MuiInputLabel-root': {
    fontSize: '28px', 
  },
  '.MuiInputLabel-shrink': {
    fontSize: '24px', 
  }
};

const Register = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className='flex flex-col h-5/6 w-1/3 max-w-screen-sm min-w-fit bg-bground px-12 py-16 gap-3 rounded-3xl shadow-2xl'>
        <div className='mb-8'>
          <h1 className='text-6xl font-bold mt-0 mb-4'>Login</h1>
        </div>
        <div className=' flex flex-col items-center justify-start gap-10'>
            <TextField sx={textFieldStyle} id="email" label="Email Address" variant="outlined"/>
            <TextField sx={textFieldStyle} id="password" label="Password" variant="outlined"/>
            <Button sx={{width: "100%", padding: "22px", borderRadius: "12px", background:'#3da9fc'}}variant="contained"><p className='normal-case font-bold text-2xl'>Sign in</p></Button>
        </div>
        <p className='text-xl'> <b className='text-button-color hover:text-blue-900'>Forgot Password?</b></p>
      </div>
    </div>
  )
}

export default Register