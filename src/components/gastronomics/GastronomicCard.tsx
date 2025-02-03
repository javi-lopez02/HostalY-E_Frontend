import { FC } from "react";
import { toast } from "sonner";
import { addItemGastronomicRequest } from "../../services/order";
import { useDisclosure } from "@nextui-org/react";
import { useAuth } from "../../context/auth.context";
import AuthUser from "../../pages/auth/AuthUser";

interface Oferts {
  id: string;
  description: string | undefined;
  price: number | undefined;
  image: string | undefined;
}

const GastronomicCard: FC<Oferts> = ({ id, description, price, image }) => {
  const { isAuth } = useAuth();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleClikAddProduct = () => {
    if (!isAuth) {
      onOpen();
      return;
    }
    toast.promise(addItemGastronomicRequest(id, 1), {
      loading: "Loading...",
      success: (res) => {
        if (res.status !== 200) {
          toast.warning(
            `Aviso: ${res.data.message || "Hubo un problema con la solicitud."}`
          );
          return "La operación no fue completamente exitosa.";
        }
        return `${res.data.message}`;
      },
      error: "Error al añadir un producto al carrito.",
    });
  };
  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm rounded-3xl ">
      <div className="h-40 w-full">
        <img className="mx-auto h-full w-full rounded-[50%]" src={image} />
      </div>
      <div className="pt-6">
        <div className="text-lg font-light leading-tight overflow-y-scroll scrollbar-hide line-clamp-2 text-gray-900 dark:text-white">
          {description}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
            ${price}
          </p>

          <button
            onClick={handleClikAddProduct}
            type="button"
            className="inline-flex items-center rounded-lg bg-blue-800 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <>
              <svg
                className="-ms-2 me-2 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M5 3a1 1 0 0 0 0 2h.687L7.82 15.24A3 3 0 1 0 11.83 17h2.34A3 3 0 1 0 17 15H9.813l-.208-1h8.145a1 1 0 0 0 .979-.796l1.25-6A1 1 0 0 0 19 6h-2.268A2 2 0 0 1 15 9a2 2 0 1 1-4 0 2 2 0 0 1-1.732-3h-1.33L7.48 3.796A1 1 0 0 0 6.5 3H5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M14 5a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0V8h1a1 1 0 1 0 0-2h-1V5Z"
                  clipRule="evenodd"
                />
              </svg>
              Comprar
            </>
          </button>
        </div>
      </div>
      <AuthUser
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      ></AuthUser>
    </div>
  );
};

export default GastronomicCard;
