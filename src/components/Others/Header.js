import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-[100px] h-[100px]">
        <img
          src="https://pngimg.com/uploads/github/github_PNG40.png"
          alt="github-icon"
          className="w-[100%]"
        />
      </div>
      <div>
        <Link
          to="/"
          className="text-gray-600 text-xl rounded-xl p-[20px] inline-block my-10px mx-0"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Header;
