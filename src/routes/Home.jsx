import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (loading) return;
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <Navbar />
      <div className="flex items-start justify-center min-h-screen mt-16">
        <div className=" flex flex-col justify-start w-6/7 sm:w-3/5 px-5 py-7 mx-5">
          <h1 class="mb-2 text-4xl font-extrabold leading-none tracking-tight text-head-color md:text-5xl lg:text-6xl">Helping you maintain a healthy posture, one sit at a time.</h1>
          <p class="mb-3 leading-none text-lg font-normal text-gray-500 lg:text-xl">Sit right, feel right, live right.</p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 w-fit bg-button-color text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            <b>Get Started</b>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
