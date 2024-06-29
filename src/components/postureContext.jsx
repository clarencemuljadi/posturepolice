// import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// Create the context
const PostureContext = createContext();

// Create a provider component
export const postureProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  //   const addToCart = (item) => {
  //     setCartItems((prevItems) => [...prevItems, item]);
  //   };

  //   const removeCart = (name) => {
  //     setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  //   };

  //   useEffect(() => {
  //     const fetchProfileData = async () => {
  //       if (uid) {
  //         try {
  //           const profileDoc = await getDoc(doc(db, "profile", uid));
  //           if (profileDoc.exists()) {
  //             const profileData = profileDoc.data();
  //             setCartItems(profileData.cartItems || []);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching profile data: ", error);
  //         }
  //       } else {
  //         setCartItems([]);
  //       }
  //     };

  //     fetchProfileData();
  //   }, [uid]);

  //   useEffect(() => {
  //     const setProfileData = async () => {
  //       try {
  //         const profileRef = doc(db, "profile", uid);
  //         await setDoc(profileRef, { uid, cartItems });
  //       } catch (error) {
  //         console.error("Error setting profile data: ", error);
  //       }
  //     };

  //     setProfileData();
  //   }, [cartItems]);

  return <PostureContext.Provider>{children}</PostureContext.Provider>;
};

// Create a custom hook to use the cart context
export const usePosture = () => {
  return useContext(PostureContext);
};
