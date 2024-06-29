import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import Navbar from "../components/Navbar";
import { logIn, auth} from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
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
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [user, setUser] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  }

  const onSubmit = async () => {
    setUser(await signUp(userDetails.email, userDetails.password, userDetails.userName));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        navigate("/Dashboard")
      }
    })
  }, [])

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
              name="userName"
              label="Full Name"
              variant="outlined"
              onChange={onChange}
              value = {userDetails.userName}
            />
            <TextField
              sx={textFieldStyle}
              name="email"
              label="Email Address"
              variant="outlined"
              onChange={onChange}
              value = {userDetails.email}
            />
            <TextField
              sx={textFieldStyle}
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              value = {userDetails.password}
              onChange={onChange}
            />
            <TextField
              sx={textFieldStyle}
              name="confirm"
              id="email"
              type="password"
              label="Confirm Password"
              variant="outlined"
              value = {userDetails.confirm}
              onChange={onChange}
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
            onClick={onSubmit}
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
