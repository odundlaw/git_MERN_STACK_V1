import Backdrop from "./Backdrop";
import NavigationItems from "./NavigationItems";

const SideBar = ({ showSideBar, click }) => {
  return (
    <>
      <Backdrop click={click} showBackdrop={showSideBar} />
      <div
        className={`sm:hidden fixed top-10 left-0 w-[40%] h-[100vh] shadow-sm bg-slate-50 z-50 p-10 flex flex-col justify-start items-start space-y-3 ${
          showSideBar ? "translate-x-0 transition-transform" : "-translate-x-64"
        }`}
        onClick={click}
      >
        <NavigationItems />
      </div>
    </>
  );
};

export default SideBar;
