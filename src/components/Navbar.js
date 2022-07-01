import NavigationItems from "./NavigationItems";

function Navbar({ click }) {
  return (
    <>
      <div className="block sm:hidden" onClick={click}>
        <div className="block sm:hidden bg-purple-400 p-2 rounded-sm cursor-pointer">
          <div className="relative border-t-2 border-t-slate-100 w-[25px] h-1"></div>
          <div className="relative border-t-2 border-t-slate-100 w-[25px] h-1"></div>
          <div className="relative border-t-2 border-t-slate-100 w-[25px] h-1"></div>
        </div>
      </div>
      <nav className="hidden sm:flex relative justify-around sm:w-[50%] sm:max-w-xs tems-baseline">
        <NavigationItems />
      </nav>
    </>
  );
}

export default Navbar;
