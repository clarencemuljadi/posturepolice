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

// h-1/3 w-1/3 max-w-screen-sm min-w-fit min-w-[700px]
const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="flex flex-col  h-full bg-bground px-8 py-8 gap-3 rounded-3xl shadow-2xl mb-20">
          <div className="mb-2">
            <h1 className="text-4xl font-bold mb-4 text-center">Login</h1>
          </div>
          <div className=" flex flex-col items-center justify-start gap-6">
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
            <Button
              sx={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                background: "#3da9fc",
              }}
              variant="contained"
            >
              <p className="normal-case font-bold text-xl">Sign in</p>
            </Button>
          </div>
          <p className="text-xl mt-1">
            {" "}
            <b className="text-button-color hover:text-blue-900">
              Forgot Password?
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
