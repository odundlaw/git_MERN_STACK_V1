import { Route, Routes, useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";
import Auth from "./containers/Auth/Auth";
import AddPost from "./containers/features/posts/AddPost";
import PostList from "./containers/features/posts/PostList";
import SinglePost from "./containers/features/posts/SinglePost";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import { signInUser, userSignOut } from "./slices/userSlices";

import axios from "./axios/axiosInstance";

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
        return navigate("/auth/login")
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

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
          const factoredExpiration =
            tokenExpiration.getTime() - new Date().getTime();
          if (!isLoggedIn) {
            dispatch(
              signInUser({
                userId: user.data.data._id?.toString(),
                email: email,
                fullName: user.data.data.fullName,
                imageUrl: imageUrl,
                isLoggedIn: true,
                token: token,
              })
            );
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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PostList onSignOut={signOutUser} />} />
          <Route path="addPost" element={<AddPost onSignOut={signOutUser} />} />
          <Route
            path="posts/post/:postId"
            element={<SinglePost onSignOut={signOutUser} />}
          />
          <Route path="addPost/:postId" element={<AddPost />} />
          <Route
            path="auth/login"
            element={
              <Auth
                onSignOut={signOutUser}
                checkAuthSignOutTime={checkAuthSignOutTime}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
