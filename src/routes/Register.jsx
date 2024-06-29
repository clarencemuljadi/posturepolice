import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import Navbar from "../components/Navbar";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const textFieldStyle = {
  width: "100%",
  ".MuiInputBase-root": {
    height: "60px",
    borderRadius: "12px",
  },
  ".MuiOutlinedInput-input": {
    width: 430,
    fontSize: "20px",
  },
  ".MuiInputLabel-root": {
    fontSize: "20px",
  },
  ".MuiInputLabel-shrink": {
    fontSize: "20px",
  },
};

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="flex flex-col  h-full bg-bground px-8 py-8 gap-3 rounded-3xl shadow-2xl mb-20">
          <div className="mb-2">
            <h1 className="text-4xl font-bold mb-4 text-center">Sign Up</h1>
          </div>
          <div className=" flex flex-col items-center justify-start gap-6">
            <TextField
              sx={textFieldStyle}
              id="name"
              label="Full Name"
              variant="outlined"
            />
            <TextField
              sx={textFieldStyle}
              id="email"
              label="Email Address"
              variant="outlined"
            />
            <TextField
              sx={textFieldStyle}
              id="password"
              label="Password"
              variant="outlined"
            />
            <TextField
              sx={textFieldStyle}
              id="email"
              label="Confirm Password"
              variant="outlined"
            />
          </div>
          <div className="flex items-center">
            <Checkbox
              {...label}
              sx={{
                color: "#3da9fc",
                padding: "2px",
                "&.Mui-checked": { color: "#3da9fc" },
              }}
            />
            <p className="m-2 text-xl">
              I accept the <b>Terms and Conditions</b>
            </p>
          </div>
          <Button
            sx={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              background: "#3da9fc",
            }}
            variant="contained"
          >
            <p className="normal-case font-bold text-2xl">Create an account</p>
          </Button>
          <p className="text-xl">
            Already have an account?{" "}
            <b className="text-button-color hover:text-blue-900">Login here</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
