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
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-bground">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-6">
            Helping you maintain a healthy posture, one sit at a time.
          </h1>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
