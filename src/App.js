import { Route, Routes } from "react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import Layout from "./components/Layout";
import Auth from "./containers/Auth/Auth";
import AddPost from "./containers/features/posts/AddPost";
import PostList from "./containers/features/posts/PostList";
import SinglePost from "./containers/features/posts/SinglePost";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import { userSignOut } from "./slices/userSlices";

function App() {
  const dispatch = useDispatch();

  const signOutUser = useCallback(() => {
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
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

  return (
    <div className="">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PostList />} />
          <Route path="addPost" element={<AddPost />} />
          <Route path="posts/post/:postId" element={<SinglePost />} />
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
