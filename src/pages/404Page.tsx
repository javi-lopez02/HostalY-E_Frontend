import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-darkblue-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-4">
          ¡Oops! Página no encontrada
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Parece que la página que buscas no existe. Es posible que haya sido eliminada o el enlace esté incorrecto.
        </p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-white text-darkblue-900 font-semibold rounded-lg shadow-md hover:bg-darkblue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-darkblue-700 focus:ring-opacity-50 transition-all duration-300"
        >
          Volver al Inicio
        </button>
      </div>
      <div className="mt-12">
        <img
          src="https://i.ibb.co/v30JLYr/Group-192-2.png"
          alt="Not Found"
          className="max-w-xs mx-auto"
        />
      </div>
    </div>
  );
}
