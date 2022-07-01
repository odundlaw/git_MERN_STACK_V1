import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { signInUser } from "../../slices/userSlices";
import { useLocation, Navigate } from "react-router";
import { createAndSignInUser } from "../../utils/helperFunction";

const Auth = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.users);
  const { checkAuthSignOutTime } = props;

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    return onAuthStateChanged(auth, (authUser) => {
      if (!isLoggedIn && authUser) {
        createAndSignInUser(authUser.email, authUser.displayName)
          .then((user) => {
            const { expirationTime } = authUser.stsTokenManager;
            const expirationDate = new Date(expirationTime);
            const factoredExpiration =
              expirationDate.getTime() - new Date().getTime();
            dispatch(
              signInUser({
                userId: user.userData._id.toString(),
                isLoggedIn: true,
                fullName: user.userData.fullName,
                email: user.userData.email,
                token: user.token,
                imageUrl: authUser.photoURL,
              })
            );
            checkAuthSignOutTime(factoredExpiration);
            localStorage.setItem("token", user.token);
            localStorage.setItem("email", user.userData.email);
            localStorage.setItem("imageUrl", authUser.photoURL);
            localStorage.setItem("expirationDate", expirationDate);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [isLoggedIn, dispatch, checkAuthSignOutTime]);

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    const from = location.state?.from;
    return <Navigate to={from ? from : "/"} />;
  }

  return (
    <div className="w-full items-center justify-center text-center">
      <button
        className={`${
          isLoading && "bg-slate-300 cursor-not-allowed"
        } bg-purple-300 hover:bg-purple-400 transition-all shadow-sm text-white p-4 rounded-full font-semibold`}
        onClick={handleSignInWithGoogle}
        disabled={isLoading ? true : false}
      >
        Singin With Google
      </button>
    </div>
  );
};

export default Auth;
