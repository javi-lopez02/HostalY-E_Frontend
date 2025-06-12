import { Spinner } from "@heroui/react";
import GastronomicCard from "../components/gastronomics/GastronomicCard";
import useGastronomics from "../customHooks/useGastronomics";
import { toast } from "sonner";

export default function Gastronomics() {
  const { gastronomics, error, loading } = useGastronomics();

  return (
    <div className="p-14 pt-20 md:p-20 flex flex-col bg-gray-50 gap-4 min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Ofertas de Comidas
        </h1>
        <span className="text-center text-lg md:text-xl font-bold leading-tight text-gray-700 dark:text-white">
          Todas las ofertas son para 30 personas
        </span>
      </div>
      <div>
        {loading && (
          <div className="w-full flex justify-center pt-4">
            <Spinner color="primary" size="md" />
          </div>
        )}

        {gastronomics.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-md md:text-lg">
              No se encontraron Comidas
            </span>
          </div>
        )}
        {!loading && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {gastronomics &&
              gastronomics.map((gastronomic) => (
                <GastronomicCard
                  key={gastronomic.id}
                  id={gastronomic.id}
                  description={gastronomic.description}
                  price={gastronomic.price}
                  image={gastronomic.imagen}
                />
              ))}
          </div>
        )}
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
