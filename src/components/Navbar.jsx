import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import DrawerExample from "./Drawer";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AnalyticsIcon from "@mui/icons-material/Analytics";
const Navbar = () => {
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
          <Link to="/Profile">
            <div className="flex gap-2 p-1 hover:bg-slate-50 rounded-md">
              <p
                className="text-lg font-bold  text-head-color
              "
              >
                Profile
              </p>
              <div>
                <PersonOutlineIcon></PersonOutlineIcon>
              </div>
            </div>
          </Link>
          <Link to="/Analytics">
            <div className="flex gap-2 p-1 hover:bg-slate-50 rounded-md">
              <p
                className="text-lg font-bold text-head-color
              "
              >
                Analytics
              </p>
              <div>
                <AnalyticsIcon sx={{ color: "#3da9fc" }}></AnalyticsIcon>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
