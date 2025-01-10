import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@nextui-org/react";
import { BiSolidDrink } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdContacts } from "react-icons/md";
import { PiBowlFoodFill } from "react-icons/pi";
import { RiGalleryFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function DrawerSideBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="inline p-2 mr-3 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          {" "}
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h14M1 6h14M1 11h7"
          />{" "}
        </svg>
      </button>
      <Drawer
        isOpen={isOpen}
        size="xs"
        placement="right"
        backdrop="transparent"
        hideCloseButton
        onOpenChange={onOpenChange}
      >
        <DrawerContent className="dark:bg-gray-800 fixed bg-white top-16">
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1"></DrawerHeader>
              <DrawerBody>
                <div className="py-4 overflow-y-hidden">
                  <ul className="space-y-2 font-medium">
                    <li>
                      <Link
                        to={"/"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <FaHome />
                        <span className="ms-3">Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/oferts"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <GiTicket />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Oferts
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          15
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/gastronomics"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <FaBowlFood />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Gastronomic
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          3
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/drinks"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <BiSolidDrink />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Drinks
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          6
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/snacks"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <IoFastFoodSharp />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Snacks
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          168
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/desserts"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <PiBowlFoodFill />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Desserts
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          15
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/gallery"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <RiGalleryFill />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Gallery
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          15
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/events"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <GrGallery />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Events
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full ">
                          15
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/contact"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <MdContacts />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          ContactUs
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </DrawerBody>
              {/*<DrawerFooter>
              
              </DrawerFooter> */}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
