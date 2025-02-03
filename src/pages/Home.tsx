import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Fondo.jpg" }}
    >
      <div className="bg-black/50 w-full h-full absolute inset-0"></div>{" "}
      {/* Overlay para dar contraste al texto */}
      <div className="relative text-center py-[220px] px-[20%] md:py-[150px] md:px-[10%] sm:py-[100px] sm:px-[5%]">
        <span className="bg-white text-gray-800 font-medium text-sm uppercase inline-block py-1.5 px-4 mb-6 sm:text-xs sm:py-1 sm:px-3">
          Cárdenas, <em className="text-blue-900 not-italic">Matanzas</em>
        </span>
        <h2 className="text-white font-extrabold text-[62px] uppercase leading-[72px] w-1/2 mx-auto md:text-[48px] md:leading-[58px] md:w-3/4 sm:text-[36px] sm:leading-[46px] sm:w-full font-cursive">
          Welcome!
          <br />
          Get the Best Hostal for you
        </h2>
      </div>
      <div>
        <footer className="w-full absolute bg-white bottom-0">
          <div className="flex justify-between">
            <div className="text-stone-950 font-semibold">
              <ul className="flex divide-x-1 divide-black pl-8 p-4 gap-4">
                <li className="flex items-center gap-1">
                  <FaPhone />
                  <i>+5363939196</i>
                </li>
                <li className="flex items-center gap-1 pl-4">
                  <FaPhone />
                  <i>+5345524473</i>
                </li>
                <li className="flex items-center gap-1 pl-4">
                  <i>Ave. García #1048 e/ 26 y 27</i>
                </li>
              </ul>
            </div>
            <div className="">
              <ul className="flex items-center pr-8 p-4 gap-4">
                <li className="flex items-center">
                  <Link
                    to={
                      "https://www.facebook.com/profile.php?id=61564099465022"
                    }
                  >
                    <FaFacebook className="w-6 h-6 text-blue-700"/>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    to={
                      "https://www.instagram.com/hostal_en_cardenascuba?igsh=cjkydWJvMWwyZjM0"
                    }
                  >
                    <FaInstagram className="w-6 h-6 text-pink-900"/>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link to={"https://wa.me//5363939196"}>
                    <FaWhatsapp className="w-6 h-6 text-green-600"/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
