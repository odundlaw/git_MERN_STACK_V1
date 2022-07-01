const LinkStyle = (isActive) =>
  isActive
    ? " bg-purple-300 sm:h-full p-1.5 w-full sm:w-auto rounded-full sm:rounded-none text-white text-lg text-center"
    : "hover:bg-purple-300 p-2 w-full sm:w-auto hover:rounded-full sm:hover:rounded-none text-center hover:text-white";

export default LinkStyle