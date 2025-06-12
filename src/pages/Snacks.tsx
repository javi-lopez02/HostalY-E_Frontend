import { toast } from "sonner";
import SnacksCard from "../components/snacks/SnacksCard";
import useSnacks from "../customHooks/useSnacks";
import { Spinner } from "@heroui/react";

export default function Snacks() {
  const { snacks, error, loading } = useSnacks();

  return (
    <div className="p-10 md:p-36 pt-20 md:pt-20 flex flex-col gap-10">
      <h1 className="text-center text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
        Menu de Meriendas
      </h1>
      <div>
        {loading && (
          <div className="w-full flex justify-center pt-4">
            <Spinner color="primary" size="md" />
          </div>
        )}

        {snacks.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-md md:text-lg">
              No se encontraron Meriendas
            </span>
          </div>
        )}
        {!loading && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {snacks &&
              snacks.map((snack) => (
                <SnacksCard
                  key={snack.id}
                  image={snack.imagen}
                  name={snack.name}
                  price={snack.price}
                />
              ))}
          </div>
        )}
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
