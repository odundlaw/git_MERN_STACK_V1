import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import AddPost from "./containers/features/posts/AddPost";
import PostList from "./containers/features/posts/PostList";
import SinglePost from "./containers/features/posts/SinglePost";

function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PostList />} />
          <Route path="addPost" element={<AddPost />} />
          <Route path="posts/post/:postId" element={<SinglePost />} />
          <Route path="addPost/:postId" element={<AddPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
