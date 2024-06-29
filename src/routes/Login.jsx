import { useEffect, useState } from "react";
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

// h-1/3 w-1/3 max-w-screen-sm min-w-fit min-w-[700px]
const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [user, setUser] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  }

  const onSubmit = async () => {
    setUser(await logIn(userDetails.email, userDetails.password));
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
            <h1 className="text-4xl font-bold mb-4 text-center">Login</h1>
          </div>
          <div className=" flex flex-col items-center justify-start gap-6">
            <TextField
              sx={textFieldStyle}
              name="email"
              label="Email Address"
              variant="outlined"
              onChange={onChange}
            />
            <TextField
              sx={textFieldStyle}
              name="password"
              label="Password"
              variant="outlined"
              onChange={onChange}
            />
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
