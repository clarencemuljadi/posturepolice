import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
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
                  src="https://media.licdn.com/dms/image/D5603AQFFeUtLXzRVeQ/profile-displayphoto-shrink_200_200/0/1692434169595?e=2147483647&v=beta&t=bxuu9UmnUu697igQUy1qY7O4-b1VwfSMXNrEnukK0zU"
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
                    Dicky Evaldo
                  </div>
                  <div className="text-lg text-text-color font-semibold underline underline-offset-8 decoration-head-color">
                    +61 413 964 664
                  </div>
                </div>
                <div className="text-lg text-text-color font-semibold underline underline-offset-8 decoration-head-color">
                  dickyevaldo@gmail.com
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-text-color">SMS alerts activation</span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-button-text-color font-semibold rounded-2xl hover:shadow-md focus:ring focus:ring-cyan-500">
                  Save
                </button>
                <Link to="/Login">
                  <button className="mt-3 font-semibold text-red-500 hover:underline underline-offset-4 active:text-red-700">
                    Logout
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid col-span-1 grid-rows-3 gap-10">
              {/* Accounts Card */}
              <div className="bg-bground p-6 rounded-[20px] shadow-lg row-span-1 border-[3px] border-border-color">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-head-color">
                    My xPay accounts
                  </h2>
                  <button className="text-sm text-head-color">Edit</button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Active account
                    </span>
                    <button className=" py-1 px-3 bg-red-500 text-white text-sm rounded-md">
                      Block Account
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Blocked account
                    </span>
                    <button className="py-1 px-3 bg-green-500 text-white text-sm rounded-md">
                      Unblock Account
                    </button>
                  </div>
                </div>
              </div>
              {/* Bills Card */}
              <div className="bg-bground p-6 rounded-[20px] shadow-lg row-span-2 border-[3px] border-border-color">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-head-color">
                    My bills
                  </h2>
                  <button className="text-sm text-head-color">Filter by</button>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Phone bill
                    </span>
                    <span className="py-1 px-3 bg-green-500 text-white text-sm rounded-md">
                      Bill paid
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Internet bill
                    </span>
                    <span className="py-1 px-3 bg-red-500 text-white text-sm rounded-md">
                      Not paid
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      House rent
                    </span>
                    <span className="py-1 px-3 bg-green-500 text-white text-sm rounded-md">
                      Bill paid
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-color font-semibold">
                      Income tax
                    </span>
                    <span className="py-1 px-3 bg-green-500 text-white text-sm rounded-md">
                      Bill paid
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
