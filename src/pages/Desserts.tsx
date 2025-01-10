import { Spinner } from "@nextui-org/react";
import DessertsCard from "../components/desserts/DessertsCard";
import useDesserts from "../customHooks/useDesserts";
import { toast } from "sonner";

export default function Desserts() {
  const { desserts, error, loading } = useDesserts();

  return (
    <div className="p-14 pt-20 md:p-20 flex flex-col bg-gray-50 gap-4 min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Ofertas de Postres
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

        {desserts.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-md md:text-lg">
              No se encontraron Postres
            </span>
          </div>
        )}
        {!loading && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {desserts &&
              desserts.map((dessert) => (
                <DessertsCard
                  key={dessert.id}
                  name={dessert.name}
                  price={dessert.price}
                  image={dessert.imagen}
                />
              ))}
          </div>
        )}
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
