import { toast } from "sonner";
import DrinksCard from "../components/drinks/DrinksCard";
import useDrinks from "../customHooks/useDrinks";
import { Spinner } from "@heroui/react";

export default function Drinks() {
  const { drinks, error, loading } = useDrinks();

  return (
    <div className="p-10 md:p-36 pt-20 md:pt-20 flex flex-col gap-10">
      <h1 className="text-center text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
        Menu de Bebidas
      </h1>
      <div>
        {loading && (
          <div className="w-full flex justify-center pt-4">
            <Spinner color="primary" size="md" />
          </div>
        )}

        {drinks.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-md md:text-lg">
              No se encontraron Bebidas
            </span>
          </div>
        )}
        {!loading && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {drinks &&
              drinks.map((drink) => (
                <DrinksCard
                  key={drink.id}
                  image={drink.imagen}
                  name={drink.name}
                  price={drink.price}
                />
              ))}
          </div>
        )}
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
