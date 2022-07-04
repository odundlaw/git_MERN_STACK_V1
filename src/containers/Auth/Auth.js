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
            const factoredExpiration = expirationDate - new Date();
            const signInObj = {
              userId: user.userData._id.toString(),
              isLoggedIn: true,
              fullName: user.userData.fullName,
              email: user.userData.email,
              token: user.token,
              imageUrl: authUser.photoURL,
            };
            dispatch(signInUser(signInObj));
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
    const state = { from: location.pathname };
    return <Navigate to={from ? from : "/"} state={state} />;
  }

  return (
    <div className="w-full items-center justify-center text-center">
      <button
        className={`${
          isLoading
            ? "bg-slate-300 cursor-not-allowed hover:bg-none"
            : "bg-purple-300 hover:bg-purple-400 "
        } transition-all shadow-sm text-white p-4 rounded-full font-semibold`}
        onClick={handleSignInWithGoogle}
        disabled={isLoading ? true : false}
      >
        Singin With Google{" "}
        {isLoading && (
          <svg
            role="status"
            className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Auth;
