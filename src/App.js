import React, { lazy, Suspense } from "react";

import { Route, Routes, useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import { signInUser, userSignOut } from "./slices/userSlices";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "./axios/axiosInstance";

const AuthComponent = lazy(() => import("./containers/Auth/Auth"));
const AddPostComponent = lazy(() =>
  import("./containers/features/posts/AddPost")
);
const PostListComponent = lazy(() =>
  import("./containers/features/posts/PostList")
);
const SinglePostComponent = lazy(() =>
  import("./containers/features/posts/SinglePost")
);

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, fullName } = useSelector((state) => state.users);

  const signOutUser = useCallback(() => {
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("expirationDate");
        return navigate("/auth/login");
      })
      .catch((err) => console.log(err));
  }, [dispatch, navigate]);

  const checkAuthSignOutTime = useCallback(
    (expirationTime) => {
      setTimeout(() => {
        signOutUser();
      }, expirationTime);
    },
    [signOutUser]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return signOutUser();
    }
    const tokenExpiration = new Date(localStorage.getItem("expirationDate"));
    if (tokenExpiration <= new Date()) {
      return signOutUser();
    } else {
      const email = localStorage.getItem("email");
      const imageUrl = localStorage.getItem("imageUrl");
      axios
        .get(`user/${email}`)
        .then((user) => {
          const factoredExpiration = tokenExpiration - new Date();
          if (!isLoggedIn) {
            const signInObj = {
              userId: user.data.data._id?.toString(),
              email: email,
              fullName: user.data.data.fullName,
              imageUrl: imageUrl,
              isLoggedIn: true,
              token: token,
            };
            dispatch(signInUser(signInObj));
            checkAuthSignOutTime(factoredExpiration);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, fullName, dispatch, signOutUser, checkAuthSignOutTime]);

  return (
    <div className="">
      <Suspense
        fallback={
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<PostListComponent onSignOut={signOutUser} />}
            />
            <Route
              path="addPost"
              element={<AddPostComponent onSignOut={signOutUser} />}
            />
            <Route
              path="posts/post/:postId"
              element={<SinglePostComponent onSignOut={signOutUser} />}
            />
            <Route path="addPost/:postId" element={<AddPostComponent />} />
            <Route
              path="auth/login"
              element={
                <AuthComponent
                  onSignOut={signOutUser}
                  checkAuthSignOutTime={checkAuthSignOutTime}
                />
              }
            />
          </Route>
        </Routes>
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
