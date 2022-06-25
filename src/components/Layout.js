import { Outlet } from "react-router";
import Wrapper from "../hoc/Wrapper";
import Navbar from "./Navbar";
import Header from "./UI/Header";

function Layout() {
  return (
    <Wrapper>
      <Header>
        <Navbar />
      </Header>
      <main className="p-8 py-10"><Outlet /></main>
    </Wrapper>
  )
}

export default Layout