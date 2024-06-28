import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import DrawerExample from "./Drawer";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AnalyticsIcon from "@mui/icons-material/Analytics";
const Navbar = () => {
  return (
    <nav className="flex max-w-full justify-between border border-gray-300 p-6 align-middle shadow-sm">
      <div className="flex self-center">
        <DrawerExample></DrawerExample>
      </div>
      <div className="flex self-center">
        <Link to="/main">
          <div className="flex gap-2">
            <h1 className="text-3xl font-semibold tracking-wider mr-16 md:mr-0 text-head-color">
              Posture Police
            </h1>
            <LocalHospitalIcon
              sx={{ fontSize: 35, color: "#ef4565" }}
            ></LocalHospitalIcon>
          </div>
        </Link>
      </div>
      <div className="flex align-middle">
        <div className="gap-6 self-end hidden md:flex">
          <Link to="/profile">
            <div className="flex gap-2">
              <p
                className="text-lg font-bold  text-head-color
              "
              >
                Profile
              </p>
              <PersonOutlineIcon></PersonOutlineIcon>
            </div>
          </Link>
          <Link to="/profile">
            <div className="flex gap-2">
              <p
                className="text-md font-bold text-head-color
              "
              >
                Analytics
              </p>
              <AnalyticsIcon sx={{ color: "#3da9fc" }}></AnalyticsIcon>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
