import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { PiBowlFoodFill } from "react-icons/pi";
import { RiGalleryFill } from "react-icons/ri";
import { BiSolidDrink } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { IoFastFoodSharp } from "react-icons/io5";
import { useAuth } from "../../context/auth.context";
import { useDisclosure } from "@heroui/react";
import { MdContacts } from "react-icons/md";
import AuthUser from "../../pages/auth/AuthUser";
import DrawerSideBar from "./DrawerSideBar";
import Avatar from "./Avatar";

const Navbar = () => {
  const { isAuth } = useAuth();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <nav className="bg-white pl-3 h-16 w-full shadow flex items-center justify-between fixed top-0 z-50 border-b">
        <div className="flex items-center space-x-3 w-60">
          <Link to="/" className="flex items-center">
            <img src="Logo.png" alt="logo" className="w-12 h-12" />
            <div className="flex flex-col">
              <h1 className="text-xl ml-2 sm:text-2xl font-bold">Hostal Y&E</h1>
              <span className="text-small ml-2 sm:text-small font-semibold">
                Tu oasis privado
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden xl:flex justify-end items-center space-x-1 w-6/12">
          <div className="hidden lg:flex font-semibold text-lg pr-6">
            <ul className="flex items-center space-x-2">
              <Link to="/">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <FaHome />
                  Home
                </li>
              </Link>
              <Link to="/oferts">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <GiTicket />
                  Oferts
                </li>
              </Link>
              <Link to="/gastronomics">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <FaBowlFood />
                  Gastronomics
                </li>
              </Link>
              <Link to="/drinks">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <BiSolidDrink />
                  Drinks
                </li>
              </Link>
              <Link to="/snacks">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <IoFastFoodSharp />
                  Snacks
                </li>
              </Link>
              <Link to="/desserts">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <PiBowlFoodFill />
                  Desserts
                </li>
              </Link>
              <Link to="/gallery">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <RiGalleryFill />
                  Gallery
                </li>
              </Link>
              <Link to="/events">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <GrGallery />
                  Events
                </li>
              </Link>
              <Link to="/contact">
                <li className="p-1 flex items-center gap-1 hover:text-blue-500 duration-200 cursor-pointer">
                  <MdContacts />
                  ContactUs
                </li>
              </Link>
            </ul>
          </div>

          <div className="flex w-auto gap-1">
            {isAuth && (
              <div className="hidden lg:flex font-semibold text-lg">
                <Link
                  to="/carShop"
                  className="sm:p-3 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer"
                >
                  <TiShoppingCart className="min-h-6 min-w-6" />
                </Link>
              </div>
            )}
            <div className="hidden xl:flex lg:items-center font-semibold text-lg">
              {isAuth && <Avatar />}
              {!isAuth && (
                <button
                  onClick={onOpen}
                  className="mr-5 ml-5 px-3 rounded-md bg-slate-900 text-white font-bold"
                >
                  {" "}
                  SingIn
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Boton Menu */}
        <div className="xl:hidden flex items-center">
          <ul className="mr-2 flex items-center">
            {isAuth && (
              <>
                <Link
                  to="/carShop"
                  className="sm:p-3  hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer"
                >
                  <li className="p-2 text-gray-900 rounded-lg outline-none hover:text-blue-500">
                    <TiShoppingCart className="min-h-6 min-w-6" />
                  </li>
                </Link>
                <li className="p-2 text-gray-900 rounded-lg outline-none hover:text-blue-500">
                  <Avatar />
                </li>
              </>
            )}
            {!isAuth && (
              <button
                onClick={onOpen}
                className="mr-5 ml-5 px-3 rounded-md bg-slate-900 text-white font-bold"
              >
                {" "}
                SingIn
              </button>
            )}
            <li className="p-2 text-gray-900 rounded-lg outline-none hover:text-blue-500">
              <DrawerSideBar />
            </li>
          </ul>
        </div>
        <AuthUser
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
