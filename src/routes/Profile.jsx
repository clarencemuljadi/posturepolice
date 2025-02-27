import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { logOut } from "../firebase-config";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const onSubmit = async () => {
    setUser(await logOut());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate("/Login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-second-bground to-third-bground flex justify-center items-center">
        <div className="max-w-6xl w-full min-h-6xl h-full bg-bground rounded-[20px] shadow-lg p-10 border-[3px] border-border-color">
          <div className="grid grid-cols-2 gap-10">
            {/* Profile Card */}
            <div className="col-span-1 bg-bground rounded-[20px] shadow-xl p-6 border-[3px] border-border-color">
              <div className="flex items-center justify-center mb-8">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXQ1UbNJpIN1hZKy3SBWtmyNz0RTEqTEMNd5kDEBm5Km5EpmXY4ojIU1oFa_GkRDLfLYc&usqp=CAU"
                  alt="Profile"
                  className="w-48 h-48 rounded-full"
                />
              </div>
              <div className="space-y-7">
                <div className="grid grid-cols-2">
                  <h2 className="text-xl font-bold text-head-color">
                    My profile
                  </h2>
                  <div>
                    <p className="text-sm text-text-color">
                      Last login: 07 Aug 2024, 14:54
                    </p>
                    <p className="text-sm text-text-color">
                      Windows 10 pro, New York (U.S.)
                    </p>
                  </div>
                </div>
                <div className="flex space-x-32">
                  <div className="text-lg text-text-color font-semibold underline underline-offset-8 decoration-head-color">
                    Posture Police
                  </div>
                  <div className="text-lg text-text-color font-semibold underline underline-offset-8 decoration-head-color">
                    +61 123 456 789
                  </div>
                </div>
                <div className="text-lg text-text-color font-semibold underline underline-offset-8 decoration-head-color">
                  posturepolice@gmail.com
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-text-color">SMS alerts activation</span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-button-text-color font-semibold py-2 px-4 rounded-3xl hover:shadow-md focus:ring focus:ring-blue-400">
                    Save
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-400 to-[#ff5470] text-button-text-color font-semibold py-2 px-4 rounded-3xl hover:shadow-md focus:ring focus:ring-red-400"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="grid col-span-1 grid-rows-3 gap-10">
              {/* Accounts Card */}
              <div className="bg-bground p-6 rounded-[20px] shadow-lg row-span-1 border-[3px] border-border-color">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-head-color">
                    Posture Count
                  </h2>
                  <button className="text-sm text-head-color hover:underline underline-offset-2">
                    Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Bad Posture
                    </span>
                    <button className=" py-1 px-3 bg-red-500 text-white text-sm font-bold rounded-md">
                      100
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Good Posture
                    </span>
                    <button className="py-1 px-3 bg-green-500 text-white text-sm font-bold rounded-md">
                      300
                    </button>
                  </div>
                </div>
              </div>
              {/* Bills Card */}
              <div className="bg-bground p-6 rounded-[20px] shadow-lg row-span-2 border-[3px] border-border-color">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-head-color">
                    About Me
                  </h2>
                  <button className="text-sm text-head-color hover:underline underline-offset-2">
                    Filter by
                  </button>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Height
                    </span>
                    <span className="py-1 px-3 bg-button-color text-white text-sm font-bold rounded-md">
                      165 cm
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Profession
                    </span>
                    <span className="py-1 px-3 bg-button-color text-white text-sm font-bold rounded-md">
                      Computer Science Student
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Education
                    </span>
                    <span className="py-1 px-3 bg-button-color text-white text-sm font-bold rounded-md">
                      UNSW
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Fun Fact
                    </span>
                    <span className="py-1 px-3 bg-button-color text-white text-sm font-bold rounded-md">
                      Have a Hunchback
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
