import { Spinner } from "@nextui-org/react";
import OfertsCard from "../components/oferts/OfertsCard";
import useOferts from "../customHooks/useOferts";
import { toast } from "sonner";

export default function Oferts() {
  const { oferts, loading, error } = useOferts();

  return (
    <div className="p-14 pt-20 md:p-20 flex flex-col bg-gray-50 gap-4 min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Ofertas (8AM - 6PM){" "}
        </h1>
        <span className="text-center text-lg md:text-xl font-bold leading-tight text-gray-700 dark:text-white">
          Todas las ofertas son para 30 personas
        </span>
        <span className="text-center text-lg md:text-xl font-bold leading-tight text-gray-700 dark:text-white">
          Incluyen la Piscina y el Ranchón
        </span>
      </div>
      <div>
        {loading && (
          <div className="w-full flex justify-center pt-4">
            <Spinner color="primary" size="md" />
          </div>
        )}

        {oferts.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-lg">
              No se encontraron Ofertas
            </span>
          </div>
        )}
        {!loading && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {oferts &&
              oferts.map((ofert) => (
                <OfertsCard
                  key={ofert.id}
                  id={ofert.id}
                  description={ofert.description}
                  price={ofert.price}
                />
              ))}
          </div>
        )}
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
