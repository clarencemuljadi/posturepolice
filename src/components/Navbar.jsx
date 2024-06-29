import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import DrawerExample from "./Drawer";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex max-w-full justify-between border-b-2 border-border-color px-6 py-4 align-middle shadow-sm">
      <div className="flex self-center">
        <DrawerExample></DrawerExample>
      </div>
      <div className="flex self-center">
        <Link to="/">
          <div className="flex gap-2">
            <h1 className="text-3xl font-semibold tracking-wider mr-16 md:mr-0 text-head-color">
              Posture Police
            </h1>
            <LocalHospitalIcon
              sx={{ fontSize: 38, color: "#ef4565" }}
            ></LocalHospitalIcon>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between my-auto">
        <div className="gap-6 hidden md:flex">
          {user ? (
            <>
              <Link to="/Profile">
                <div className="flex gap-2 p-1 hover:bg-slate-50 rounded-md">
                  <p className="text-lg font-bold text-head-color">Profile</p>
                  <div>
                    <PersonOutlineIcon></PersonOutlineIcon>
                  </div>
                </div>
              </Link>
              <Link to="/Analytics">
                <div className="flex gap-2 p-1 hover:bg-slate-50 rounded-md">
                  <p className="text-lg font-bold text-head-color">Analytics</p>
                  <div>
                    <AnalyticsIcon sx={{ color: "#3da9fc" }}></AnalyticsIcon>
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <div className="flex gap-2 p-1 hover:bg-slate-50 rounded-md">
                  <p className="text-lg font-bold text-head-color">Register</p>
                  <div>
                    <HowToRegIcon sx={{ color: "#3da9fc" }}></HowToRegIcon>
                  </div>
                </div>
              </Link>
              <Link to="/login">
                <div className="flex gap-2 p-1 hover:bg-slate-50 rounded-md">
                  <p className="text-lg font-bold text-head-color">Login</p>
                  <div>
                    <LoginIcon sx={{ color: "#3da9fc" }}></LoginIcon>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
