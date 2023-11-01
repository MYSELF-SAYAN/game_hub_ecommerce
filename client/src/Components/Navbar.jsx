import React, { useState } from "react";
import { BiSolidGame } from "react-icons/bi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { logOutUser } from "../Store/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const isMid = useMediaQuery({ maxWidth: 766 });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = ["Profile", "Cart", "Log Out"];
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };
  const user = true;
  return (
    <div className="flex justify-between  items-center px-10 py-5 sm:px-2 fixed h-[80px] w-full z-50">
      <Link to="/">
        <div className="flex items-center justify-center text-3xl md:text-xl sm:text-base">
          <BiSolidGame />
          <h1 style={{ fontFamily: "Brosalino" }} className="font-bold">
            GameHub
          </h1>
        </div>
      </Link>

      {user ? (
        <div>
          {isMid ? (
            <div>
              <div className="relative  text-gray-400">
                <button
                  className="bg-black text-white   rounded inline-flex items-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="text-xl sm:text-base">
                    {selectedOption || "Others"}
                  </span>
                  <IoIosArrowDropdownCircle className="ml-2 sm:ml-[5px]" />
                </button>
                {isOpen && (
                  <div className="absolute z-10 bg-black py-2 w-full mt-1 rounded-lg shadow-lg ">
                    {options.map((option) => (
                      <div
                        key={option}
                        className="px-1 py-2 hover:text-gray-100 cursor-pointer pb-2 border-b-[1px] sm:text-base"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex">
              <Link to="/cart"><p className="mx-3 text-2xl">Cart</p></Link>
              <Link to="/profile"><p className="mx-3 text-2xl">Profile</p></Link>
             
              <p className="mx-3 text-2xl cursor-pointer" onClick={()=>{handleLogOut()}}>Sign Out</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="mx-3 text-2xl">Sign In</p>
          <p className="mx-3 text-2xl">Sign Up</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
